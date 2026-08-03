# Capstone: Build-in-Public Story — Cybersicker
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## The Vision
Modern Security Operations Centers (SOCs) are overwhelmed by alert fatigue. Most alerts are false positives, and analyzing true positives requires manually correlation across threat intelligence feeds. I wanted to build an autonomous SOC analyst assistant (`Cybersicker`) that combines high-throughput machine learning detection with intelligent, agentic investigation.

---

## The Real Win: Multi-Vector Threat Mapping
My biggest success was creating a unified pipeline where network traffic anomaly detection leads directly to structured threat modeling.
* We trained a **TensorFlow Autoencoder** on the NSL-KDD dataset, achieving a **98.31% accuracy** in identifying anomaly patterns (DDoS, botnets, ransomware).
* When an anomaly is detected, instead of just logging it, a **Gemini 2.5 Flash agentic engine** (built with LangChain) is triggered. The agent automatically executes 5 local investigation tools, queries active threat feeds, maps the attack vector to **MITRE ATT&CK for ICS/IoT**, and drafts a complete incident report.

This successfully bridges the gap between passive anomaly detection and active threat hunting, transforming raw logs into actionable mitigation playbooks in seconds.

---

## The Real Limitation: Real-Time Latency & Token Overhead
One major limitation we encountered was the high latency and API cost of running LLM agent chains for every incoming packet. 
* During initial testing, we tried routing all anomalies directly to the Gemini API. At 100+ alerts per minute, this caused significant queue delays (often taking 8-12 seconds per agent run) and quickly exhausted API rate limits.
* **The Solution:** We had to implement strict triage rules. The lightweight TensorFlow model does 100% of the initial screening. The Gemini Agent is only invoked for high-severity alerts (e.g., suspected botnet beacons or command-and-control communication). For lower-severity scans, we fall back to local rule-based parsers.

While this hybrid approach saves cost and solves scale issues, it means the autonomous agent is not fully real-time for all minor events and depends heavily on the accuracy of the first-stage autoencoder filter.
