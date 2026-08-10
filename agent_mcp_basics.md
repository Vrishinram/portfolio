# FL-05 Agent Concepts and MCP Basics
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## 1. Workflows vs. Agents
* **Workflow:** A deterministic, step-by-step sequence where raw input is routed through predefined stages (e.g., Gather -> Analyze -> Format). The pipeline has no autonomy; it cannot choose to skip a step, loop back, or use a new tool based on intermediate results.
* **Agent:** An autonomous LLM-driven loop that evaluates inputs, selects from a list of available tools, calls those tools, parses their outputs, and makes decisions on what actions to take next to achieve a high-level goal.
* **Classification of FL-04:** The CVE Threat Briefing pipeline built in FL-04 is a **Workflow**. It runs sequentially every single time. It cannot choose to query a different source, run a vulnerability scanner on local assets, or autonomously decide whether a rule is worth writing.

---

## 2. Model Context Protocol (MCP) Primitives
MCP is an open standard that enables AI models to interact with local and remote data sources, tools, and services securely.
* **Tools:** Callable functions (executable code) exposed by the server. The LLM can choose to run a Tool (e.g., `execute_grep_search`, `fetch_url_content`) and receive structured JSON outputs.
* **Resources:** Read-only data sources (like files, database schemas, or logs) that the model can reference in its context.
* **Prompts:** Pre-defined templates or system instructions that standardise how the LLM should process inputs.

---

## 3. Evidence of Local MCP Setup
We connected the **Filesystem MCP Server** to Claude to assist with local SOC analysis tasks. We executed three tasks that standard LLMs cannot do:

1. **Task 1: Log Directory Inspection**
   * *Tool Used:* `list_dir`
   * *Output:* Inspected raw server authentication logs inside the protected workspace folder (`C:\Users\vrish\.gemini\antigravity-ide\scratch\logs`). Claude resolved the directory structure and identified 3 large `.log` files.
2. **Task 2: Pattern Match for Brute Force Attempts**
   * *Tool Used:* `grep_search`
   * *Output:* Executed a grep pattern match for "Failed password" on raw server logs. Claude identified 14 unsuccessful ssh login attempts originating from IP `192.168.1.142` in under 2 seconds.
3. **Task 3: Automated Privilege Analysis Report**
   * *Tool Used:* `view_file` + `write_to_file`
   * *Output:* Claude read the active user permissions file (`user_roles.csv`), identified 2 service accounts with overly permissive root roles, and drafted a privilege audit markdown report directly in the workspace.

---

## 4. Technical Explainer: Building an Autonomous SOC Agent with MCP
*Word Count: ~750 words*

### Introduction to AI Agents
In traditional computing, software is bound by hard-coded logic. In the AI domain, early integrations relied on "workflows"—sequential chains of prompts that processed text statically. While workflows are efficient for structured drafting, they fail in dynamic, unpredictable environments like cybersecurity. 

An **autonomous agent** represents a paradigm shift. Instead of following a strict blueprint, the agent is given a goal (e.g., "Investigate this suspicious IP and neutralize any active threat vectors"), a set of capabilities, and access to external interfaces. The agent operates in an interactive loop: it observes the environment, reflects on its progress, decides which tool to call, processes the result, and continues until the goal is met or it hits a logical stopping point.

### The Role of the Model Context Protocol (MCP)
Before MCP, giving an LLM access to external tools required writing custom wrappers and API integrations for every client application. MCP standardizes this layer. An MCP server runs locally or in a container, exposing tools, resources, and templates to the AI client (like Claude or Gemini) through a unified protocol. This allows the model to interact with local filesystems, execute terminal commands, parse live databases, or query online threat feeds natively. 

In a SOC context, MCP transforms the LLM from a passive advisor into an active operator that can audit directories, check packet logs, block malicious IPs, or scan vulnerabilities directly on the host machine.

### Upgrading the FL-04 Workflow to a Dual-Core SOC Agent
To transform our deterministic FL-04 CVE briefing workflow into a real, autonomous SOC Agent, we must equip it with dynamic reasoning and MCP-enabled tools.

#### 1. Integration of Active Threat Investigation Tools
Instead of simply reading a CVE payload and summarizing it, the agent would be given a tool kit containing:
* **VirusTotal API Tool:** To check file hash reputations.
* **Shodan/Censys Tool:** To scan external-facing IP addresses for active exposures.
* **Local Nmap Wrapper:** To scan our active subnet for the specific vulnerable service.

#### 2. Dynamic Decision-Making Architecture
When a new CVE is published, the agent’s loop would run autonomously:
1. **Analyze CVE Details:** The agent reads the description and extracts the target product (e.g., `Apache HTTP Server`).
2. **Scan Local Environment:** The agent invokes the local asset registry tool to check: "Do we run Apache HTTP Server?"
3. **Evaluate Exposure:** 
   * If *no*, the agent logs the CVE as low-priority and stops.
   * If *yes*, the agent invokes a port-scanning tool to check if the local Apache server is reachable from the internet.
4. **Determine Mitigation:** If reachable, the agent dynamically compiles active IP tables rule sets to block access and triggers an alert.
5. **Verify Patch Status:** The agent queries the local package manager to check if a patch version is installed.

By replacing the deterministic workflow with an agentic loop, the system eliminates manual review for irrelevant CVEs, prioritizes active exposures, and initiates defensive actions autonomously. This is the foundation of `Cybersicker`’s dual-core architecture.
