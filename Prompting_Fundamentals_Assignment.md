# FL-02 — Prompting Fundamentals on Real Tasks v2

**Intern:** Vrishin Ram K  
**Track:** General AI Fluency  
**Date:** August 4, 2026  

---

## 1  The Task (from FL-01 Audit)

During my FL-01 AI Workflow Audit, I identified a recurring task in my SOC (Security Operations Center) workflow:

> **Triage an alert log and produce a structured incident summary with severity rating, affected assets, recommended response actions, and escalation criteria.**

This is a daily task I perform when reviewing SIEM alerts. A typical raw alert log looks like this:

```
[2026-08-03 02:14:33 UTC] ALERT src_ip=203.0.113.47 dst_ip=10.0.1.15 port=445
  proto=TCP rule="SMB Brute Force Detected" severity=HIGH count=847
  user_agent=N/A geo=CN  asset_tag=FILESERV-01  zone=DMZ

[2026-08-03 02:14:35 UTC] ALERT src_ip=203.0.113.47 dst_ip=10.0.1.16 port=3389
  proto=TCP rule="RDP Login Anomaly" severity=MEDIUM count=23
  user_agent=N/A geo=CN  asset_tag=JUMPBOX-02  zone=INTERNAL

[2026-08-03 02:15:01 UTC] ALERT src_ip=10.0.1.15 dst_ip=10.0.1.200 port=8443
  proto=TCP rule="Lateral Movement - Unusual Internal Scan" severity=CRITICAL count=312
  user_agent="curl/7.88.1" geo=INTERNAL  asset_tag=DC-PRIMARY  zone=CORE

[2026-08-03 02:15:44 UTC] ALERT src_ip=10.0.1.15 dst_ip=198.51.100.5 port=443
  proto=TCP rule="C2 Beacon Detected" severity=CRITICAL count=6
  user_agent="Mozilla/5.0 (compatible; beacon/2.1)" geo=RU  asset_tag=FILESERV-01  zone=DMZ
```

---

## 2  Version 0 — Naive Prompt (Baseline)

### Prompt
```
Analyze these alerts and tell me what happened.
```

### Output (Claude 3.5 Sonnet)
> Looking at these alerts, it appears that an attacker from China (203.0.113.47) attempted to brute force SMB on your file server and also tried RDP login on a jumpbox. Then the file server started scanning internally and there's a C2 beacon going to Russia. This looks like a potential compromise. You should investigate the file server and block the external IPs.

### Observation
The model gave a loose narrative summary. It is directionally correct but:
- No severity rating
- No structured format (just a paragraph)
- No escalation criteria
- "Investigate the file server" is vague
- Missing MITRE ATT&CK mapping
- A junior analyst couldn't act on this without follow-up questions

---

## 3  Version 1 — Role Assignment

**Technique:** *Role assignment* — Tell the model who it is and what standard it should work to.

### Prompt
```
You are a Tier-2 SOC analyst at a mid-size enterprise. Your job is to
triage SIEM alerts and produce incident summaries that a Tier-3 analyst
or incident commander can act on immediately.

Analyze the following alert log and produce an incident summary.

[alert log pasted]
```

### Output (Claude 3.5 Sonnet)
> **Incident Summary**
>
> **Overview:** An external threat actor originating from 203.0.113.47 (GeoIP: China) conducted a multi-stage attack beginning with SMB brute force against FILESERV-01 in the DMZ, followed by lateral movement to DC-PRIMARY in the CORE zone, and established C2 communication to 198.51.100.5 (GeoIP: Russia).
>
> **Affected Systems:**
> - FILESERV-01 (10.0.1.15) — DMZ — Likely compromised
> - JUMPBOX-02 (10.0.1.16) — INTERNAL — Targeted via RDP
> - DC-PRIMARY (10.0.1.200) — CORE — Scanned from compromised host
>
> **Severity:** Critical
>
> **Recommended Actions:**
> 1. Isolate FILESERV-01 immediately
> 2. Block 203.0.113.47 and 198.51.100.5 at the perimeter firewall
> 3. Check DC-PRIMARY for signs of compromise
> 4. Review RDP logs on JUMPBOX-02
> 5. Preserve forensic evidence on FILESERV-01
>
> **Escalation:** This should be escalated to the incident response team given the C2 beacon and potential domain controller compromise.

### What Changed and Why
Adding the Tier-2 SOC analyst role dramatically improved structure:
- Produced a structured summary instead of a paragraph
- Listed affected assets with IPs and zones
- Gave a severity rating and actionable response steps
- Still missing: MITRE ATT&CK mapping, timeline, specific escalation triggers

---

## 4  Version 2 — Context and Motivation

**Technique:** *Context and motivation* — Explain why the output matters and what downstream decision it feeds.

### Prompt
```
You are a Tier-2 SOC analyst at a mid-size enterprise...

Context: This alert cluster was flagged by our automated correlation
engine at 02:15 UTC during off-hours. The incident commander on-call
will read your summary to decide whether to activate the full IR team
(which costs $15,000/hr in overtime + vendor fees) or handle it with
the skeleton crew. Your summary must be precise enough to justify
that decision.

Analyze the following alert log and produce an incident summary.

[alert log pasted]
```

### Output (Claude 3.5 Sonnet)
> **INCIDENT SUMMARY — CASE #INC-2026-0803-0215**
>
> **Classification:** Active Intrusion with Lateral Movement and C2 Establishment
> **Overall Severity:** CRITICAL — Full IR Team Activation Recommended
> **Confidence:** HIGH (corroborated across 4 correlated alerts, 2 distinct external IPs, internal propagation confirmed)
>
> **Decision Recommendation:** ACTIVATE full IR team. Rationale: The attack chain has progressed beyond initial access to lateral movement and C2 establishment. The domain controller (DC-PRIMARY) has been scanned from a compromised host. Delay risks domain-wide compromise.
>
> **Attack Timeline:**
> | Time (UTC) | Event | Source → Target | Severity |
> |---|---|---|---|
> | 02:14:33 | SMB Brute Force (847 attempts) | 203.0.113.47 → FILESERV-01 | HIGH |
> | 02:14:35 | RDP Login Anomaly (23 attempts) | 203.0.113.47 → JUMPBOX-02 | MEDIUM |
> | 02:15:01 | Internal scan (312 connections) | FILESERV-01 → DC-PRIMARY | CRITICAL |
> | 02:15:44 | C2 Beacon (6 check-ins) | FILESERV-01 → 198.51.100.5 | CRITICAL |
>
> **Containment Actions (ordered by priority):**
> 1. Network-isolate FILESERV-01 (disable switch port or VLAN quarantine)
> 2. Block egress to 198.51.100.5:443 at perimeter FW — kill the C2 channel
> 3. Block ingress from 203.0.113.47 at perimeter FW
> 4. Force password reset for any accounts that authenticated to FILESERV-01
> 5. Enable enhanced logging on DC-PRIMARY
>
> **Escalation Trigger Met:** Yes — lateral movement to CORE zone asset + active C2 = full IR activation per playbook.

### What Changed and Why
Adding the motivation (the $15K/hr decision) transformed the output:
- The model now leads with a **decision recommendation**
- Timeline is tabular and chronological
- Confidence level included
- Containment actions are **ordered by priority**
- Escalation is tied to a specific trigger
- Still missing: MITRE ATT&CK mapping, IOC extraction table

---

## 5  Version 3 — Few-Shot Examples

**Technique:** *Few-shot examples* — Show the model a completed example of the desired output format.

### Prompt
```
[Role + Context from V2]

Here is an example of a well-formatted incident summary:

---BEGIN EXAMPLE---
**INCIDENT SUMMARY — CASE #INC-2026-0719-1430**
**Kill Chain Stage:** Initial Access → Execution
**Overall Severity:** HIGH
**MITRE ATT&CK:** T1566.001 (Spearphishing Attachment), T1059.001 (PowerShell)

**Decision:** Handle with skeleton crew. Attack caught at Execution stage.

**Timeline:**
| Time | Event | Src → Dst | MITRE |
|---|---|---|---|
| 14:30 | Phishing email delivered | ext → user@corp | T1566.001 |
| 14:32 | Macro executed, PowerShell spawned | WKSTN-44 | T1059.001 |

**IOCs:**
| Type | Value | Context |
|---|---|---|
| SHA256 | a1b2c3... | Malicious .xlsm attachment |
| Domain | evil-payload.example.com | PowerShell download target |
---END EXAMPLE---

Now analyze THIS alert cluster in the same format:
[alert log pasted]
```

### Output (Claude 3.5 Sonnet)
> **INCIDENT SUMMARY — CASE #INC-2026-0803-0215**
>
> **Kill Chain Stage:** Initial Access → Lateral Movement → Command and Control
> **Overall Severity:** CRITICAL
> **MITRE ATT&CK:** T1110.001 (Password Guessing), T1021.002 (SMB/Windows Admin Shares), T1021.001 (Remote Desktop Protocol), T1570 (Lateral Tool Transfer), T1071.001 (Web Protocols — C2)
>
> **Decision:** ACTIVATE full IR team. Attack chain has reached C2 with lateral movement to CORE zone.
>
> **Timeline:**
> | Time (UTC) | Event | Src → Dst | MITRE |
> |---|---|---|---|
> | 02:14:33 | SMB brute force (847 attempts) | 203.0.113.47 → FILESERV-01 (DMZ) | T1110.001 |
> | 02:14:35 | RDP login anomaly (23 attempts) | 203.0.113.47 → JUMPBOX-02 (INT) | T1021.001 |
> | 02:15:01 | Internal scan to DC (312 conn) | FILESERV-01 → DC-PRIMARY (CORE) | T1570 |
> | 02:15:44 | C2 beacon (6 check-ins) | FILESERV-01 → 198.51.100.5 (RU) | T1071.001 |
>
> **IOCs:**
> | Type | Value | Context |
> |---|---|---|
> | IPv4 | 203.0.113.47 | Attacker source IP, GeoIP: China |
> | IPv4 | 198.51.100.5 | C2 server, GeoIP: Russia |
> | Port | 445/TCP | SMB brute force target |
> | User-Agent | curl/7.88.1 | Used in lateral movement scan |
> | User-Agent | Mozilla/5.0 (compatible; beacon/2.1) | C2 beacon signature |
>
> **Affected Assets:**
> | Asset | IP | Zone | Status |
> |---|---|---|---|
> | FILESERV-01 | 10.0.1.15 | DMZ | COMPROMISED |
> | JUMPBOX-02 | 10.0.1.16 | INTERNAL | AT RISK |
> | DC-PRIMARY | 10.0.1.200 | CORE | TARGETED |

### What Changed and Why
The few-shot example was transformative:
- **MITRE ATT&CK mappings** appeared — mirrored the example's MITRE column
- **IOC table** extracted automatically — IP addresses, ports, user-agents
- Kill chain stage classification added
- Output format is now perfectly consistent and parseable

---

## 6  Version 4 — Output Structure (JSON)

**Technique:** *Output structure* — Request a machine-parseable format so downstream tools can ingest it.

### Prompt
```
You are a Tier-2 SOC analyst. Produce an incident triage summary in
valid JSON matching this schema:

{
  "case_id": "string",
  "kill_chain_stage": "string",
  "severity": "LOW | MEDIUM | HIGH | CRITICAL",
  "mitre_techniques": ["T-code (name)", ...],
  "decision": "SKELETON_CREW | ACTIVATE_IR",
  "timeline": [{...}],
  "iocs": [{...}],
  "affected_assets": [{...}],
  "containment_actions": ["string"],
  "escalation_met": true | false,
  "escalation_reason": "string"
}

Alert log: [pasted]
```

### Output (Claude 3.5 Sonnet)
```json
{
  "case_id": "INC-2026-0803-0215",
  "kill_chain_stage": "Initial Access > Lateral Movement > C2",
  "severity": "CRITICAL",
  "mitre_techniques": [
    "T1110.001 (Password Guessing)",
    "T1021.001 (Remote Desktop Protocol)",
    "T1570 (Lateral Tool Transfer)",
    "T1071.001 (Application Layer Protocol: Web)"
  ],
  "decision": "ACTIVATE_IR",
  "decision_rationale": "C2 established with lateral movement from DMZ to CORE zone. Domain controller targeted.",
  "timeline": [
    {"time_utc": "02:14:33", "event": "SMB brute force - 847 attempts", "src": "203.0.113.47", "dst": "FILESERV-01", "mitre": "T1110.001"},
    {"time_utc": "02:14:35", "event": "RDP login anomaly - 23 attempts", "src": "203.0.113.47", "dst": "JUMPBOX-02", "mitre": "T1021.001"},
    {"time_utc": "02:15:01", "event": "Internal scan - 312 connections", "src": "FILESERV-01", "dst": "DC-PRIMARY", "mitre": "T1570"},
    {"time_utc": "02:15:44", "event": "C2 beacon - 6 check-ins", "src": "FILESERV-01", "dst": "198.51.100.5", "mitre": "T1071.001"}
  ],
  "iocs": [
    {"type": "ipv4", "value": "203.0.113.47", "context": "Attacker source, China"},
    {"type": "ipv4", "value": "198.51.100.5", "context": "C2 server, Russia"},
    {"type": "user_agent", "value": "curl/7.88.1", "context": "Lateral movement tool"},
    {"type": "user_agent", "value": "Mozilla/5.0 (compatible; beacon/2.1)", "context": "C2 beacon"}
  ],
  "affected_assets": [
    {"name": "FILESERV-01", "ip": "10.0.1.15", "zone": "DMZ", "status": "COMPROMISED"},
    {"name": "JUMPBOX-02", "ip": "10.0.1.16", "zone": "INTERNAL", "status": "AT_RISK"},
    {"name": "DC-PRIMARY", "ip": "10.0.1.200", "zone": "CORE", "status": "TARGETED"}
  ],
  "containment_actions": [
    "1. Network-isolate FILESERV-01",
    "2. Block egress to 198.51.100.5:443",
    "3. Block ingress from 203.0.113.47",
    "4. Credential reset for FILESERV-01 accounts",
    "5. Enhanced logging on DC-PRIMARY"
  ],
  "escalation_met": true,
  "escalation_reason": "Lateral movement to CORE + active C2"
}
```

### What Changed and Why
- Output is now **machine-parseable** — ingestible by SOAR playbooks or ticketing systems
- Enum-constrained fields ensure consistency
- **Trade-off:** JSON is harder for a human to scan at 3 AM. Version 3 markdown is better for human consumption; JSON is better for automation.

---

## 7  Version 5 — Step Decomposition (Chain of Thought)

**Technique:** *Step decomposition* — Break the analysis into explicit reasoning steps.

### Prompt
```
You are a Tier-2 SOC analyst. Analyze the following alert log by working
through these steps explicitly. Show your reasoning for each step.

Step 1 — TIMELINE RECONSTRUCTION: List every alert chronologically.
Note source, destination, protocol, and attacker intent.

Step 2 — KILL CHAIN MAPPING: Map each event to a MITRE ATT&CK technique.
Determine whether the attack is contained or active.

Step 3 — ASSET IMPACT ASSESSMENT: Classify each asset as COMPROMISED,
AT_RISK, or TARGETED. Explain your reasoning.

Step 4 — SEVERITY DETERMINATION: Assign LOW/MEDIUM/HIGH/CRITICAL.
Justify based on zone boundaries, asset criticality, C2/exfil status.

Step 5 — RESPONSE PRIORITIZATION: List containment actions in priority
order. Explain the ranking.

Step 6 — FINAL SUMMARY: Produce the incident summary in standard format.

Alert log: [pasted]
```

### Output (Claude 3.5 Sonnet)
> **Step 1 — TIMELINE RECONSTRUCTION**
>
> 1. **02:14:33** — 203.0.113.47 (CN) → FILESERV-01:445/TCP. Rule: "SMB Brute Force." 847 attempts = automated credential stuffing. Intent: initial foothold in DMZ.
>
> 2. **02:14:35** — Same IP → JUMPBOX-02:3389/TCP. Rule: "RDP Login Anomaly." 23 attempts, 2 seconds after SMB. Attacker running parallel vectors. Intent: alternative access path.
>
> 3. **02:15:01** — FILESERV-01 → DC-PRIMARY:8443/TCP. Source is now internal — FILESERV-01 was compromised. 312 connections, curl user-agent confirms tool-based scan. Intent: DC service enumeration for privilege escalation.
>
> 4. **02:15:44** — FILESERV-01 → 198.51.100.5:443 (RU). C2 beacon with framework signature. 6 check-ins = initial registration phase. Intent: persistent remote access.
>
> **Key insight:** Entire chain from initial access to C2 took ~71 seconds. This speed indicates automated, pre-staged attack.
>
> **Step 2 — KILL CHAIN MAPPING**
>
> | Event | Stage | MITRE | Status |
> |---|---|---|---|
> | SMB brute force | Initial Access | T1110.001 | Succeeded |
> | RDP anomaly | Initial Access (parallel) | T1021.001 | Unknown |
> | Internal scan | Discovery + Lateral Movement | T1046, T1570 | Active |
> | C2 beacon | Command and Control | T1071.001 | Active |
>
> Attack is **NOT contained** — C2 live, attacker has CORE zone access path.
>
> **Step 3 — ASSET IMPACT**
>
> | Asset | Status | Evidence |
> |---|---|---|
> | FILESERV-01 | COMPROMISED | Source of lateral movement + C2 beacon |
> | JUMPBOX-02 | AT_RISK | 23 RDP attempts; credentials may be reused from SMB brute force |
> | DC-PRIMARY | TARGETED | 312 scan connections; no evidence of successful access yet |
>
> **Step 4 — SEVERITY: CRITICAL**
>
> - Zone escalation: DMZ → CORE (worst boundary violation)
> - Asset criticality: DC-PRIMARY is Tier-0 (domain-wide impact if compromised)
> - C2 established: attacker has persistent channel
> - 71-second chain suggests additional staged capabilities
>
> **Step 5 — RESPONSE PRIORITIZATION**
>
> 1. **Isolate FILESERV-01** (IMMEDIATE) — kills both lateral movement AND C2 in one action
> 2. **Block egress to 198.51.100.5** (IMMEDIATE) — redundant C2 kill, defense in depth
> 3. **Block ingress from 203.0.113.47** (HIGH) — insufficient alone since attacker has internal access
> 4. **Credential reset** (HIGH) — brute force succeeded, credentials may be reused
> 5. **Enhanced monitoring on DC-PRIMARY** (HIGH) — determine if scan succeeded
> 6. **Forensic image of FILESERV-01** (MEDIUM) — preserve evidence before remediation

### What Changed and Why
Step decomposition produced the **richest output** of all versions:
- **Explicit reasoning** for every classification
- **Novel insight**: 71-second kill chain flagged as evidence of automation (no previous version caught this)
- **Better MITRE mapping**: Added T1046 (Network Service Discovery), missing from Version 3
- **Priority rationale**: Explains *why* each action is ranked, not just listing them
- **Trade-off**: Output is much longer. For 3 AM triage, combine CoT internally with Version 3 format externally.

---

## 8  Cross-Model Comparison: Claude vs. ChatGPT

I ran the Version 5 prompt on both **Claude 3.5 Sonnet** and **ChatGPT-4o**.

| Dimension | Claude 3.5 Sonnet | ChatGPT-4o |
|---|---|---|
| **Tone** | Professional, measured. Appropriate hedging ("likely pre-staged," "may be reused"). | More assertive. Higher confidence without qualifying evidence. |
| **Accuracy** | All 4 events correct. Caught 71-second timeline. Used T1046 for internal scan (precise). | All 4 events correct. Used T1018 (Remote System Discovery) instead of T1046 — defensible but less precise for port scanning. |
| **Structure** | Followed all 6 steps faithfully. Each step builds on previous. | Merged Steps 3 and 4. Final summary mixed narrative with tables. |
| **Failure Points** | Conservative on JUMPBOX-02 — said "credentials may be captured" but missed SMB relay as escalation vector. | Explicitly mentioned SMB relay risk (good catch) but over-committed: said "JUMPBOX-02 is likely compromised" without evidence. |
| **Reasoning Depth** | Reasoning for every assessment. Unprompted 71-second automation insight. | Good reasoning but no timeline calculation. Added "check for persistence mechanisms" — valid addition Claude missed. |
| **IOC Extraction** | Complete — all IPs, user-agents, ports. | Missed curl/7.88.1 as separate IOC. |

### Verdict
**Claude** produced more reliable, better-structured output. Its conservative hedging is appropriate for incident triage. **ChatGPT** added one valuable insight (SMB relay risk) but over-stated compromise status.

For production SOC use: **Claude as primary triage engine**, secondary ChatGPT pass to catch complementary insights.

---

## 9  Final Reusable Prompt Template

```
You are a Tier-2 SOC analyst at a [COMPANY_SIZE] enterprise. Your incident
summaries are read by the on-call incident commander to decide between
skeleton-crew handling and full IR-team activation.

Analyze the alert log below by working through these steps. Show reasoning.

Step 1 — TIMELINE: List every alert chronologically. Note source,
destination, protocol, and what the rule name reveals about attacker intent.

Step 2 — KILL CHAIN: Map each event to a MITRE ATT&CK technique (T-codes).
Identify the furthest kill chain stage. State whether contained or active.

Step 3 — ASSET IMPACT: Classify each affected asset as COMPROMISED,
AT_RISK, or TARGETED. Justify with evidence from the logs.

Step 4 — SEVERITY: Assign LOW / MEDIUM / HIGH / CRITICAL. Justify based
on: zone boundaries crossed, asset criticality tier, C2/exfiltration status.

Step 5 — RESPONSE: List containment actions in priority order. Explain
each ranking.

Step 6 — SUMMARY: Output the final incident summary:
  Case ID | Kill Chain Stage | Severity | MITRE Techniques
  Decision: SKELETON_CREW or ACTIVATE_IR + rationale
  Timeline table (Time | Event | Src > Dst | MITRE T-code)
  IOC table (Type | Value | Context)
  Affected Assets table (Name | IP | Zone | Status)
  Containment actions (numbered, priority order)
  Escalation: met/not met + reason

---
ALERT LOG:
[paste raw alert log here]
```

### Why This Template Works
1. **Role assignment** anchors expertise level and output audience
2. **Context/motivation** (activation decision) gives concrete downstream purpose
3. **Step decomposition** forces explicit reasoning before conclusions
4. **Output structure** (Step 6 format) ensures consistent, scannable results
5. **Self-contained** — a stranger can copy-paste, insert their alert log, and get production-quality triage on the first run

---

## 10  Summary of Techniques and Their Impact

| Version | Technique | Key Improvement | Limitation Discovered |
|---|---|---|---|
| V0 | Naive prompt | Baseline | Paragraph dump, no structure, not actionable |
| V1 | Role assignment | Structured output, severity, action steps | No MITRE mapping, vague escalation |
| V2 | Context + motivation | Decision recommendation, priority ordering | No MITRE mapping or IOC table |
| V3 | Few-shot examples | MITRE mapping, IOC extraction, consistent format | No visible reasoning |
| V4 | Output structure (JSON) | Machine-parseable, enum-constrained | Hard for humans at 3 AM |
| V5 | Step decomposition | Explicit reasoning, novel insights, justified priorities | Output is long |
| Final | All techniques combined | Best of all versions in reusable template | — |
