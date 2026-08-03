# Capstone: Technical Build Write-Up — Cybersicker
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## 1. Technical Stack Decisions
For `Cybersicker` and its integration with my web portfolio, I chose the following stack:
* **Frontend Portfolio & Dashboard:** Next.js 16 (App Router) + React 19 + Framer Motion. 
  * *Why:* I wanted a highly responsive, modern scrollytelling interface to present my projects dynamically. Next.js offers superior performance and is natively supported by Vercel for fast deployments.
* **SOC Backend & Inference:** Python (Flask) + TensorFlow + LangChain + Google Gemini 2.5 Flash API.
  * *Why:* Python is essential for handling machine learning workflows. TensorFlow was selected to build and execute the deep autoencoder, while LangChain provided the orchestration layer for the Gemini-based agentic threat investigation.

---

## 2. The Hardest Thing That Broke
The most challenging part of the project was deploying the TensorFlow anomaly detection model onto a serverless cloud environment (Vercel).
* **The Break:** The compiled Keras model file combined with the TensorFlow/NumPy package dependencies exceeded Vercel's **50MB serverless function bundle limit**. Additionally, loading the model into memory on cold starts caused functions to hit execution time limit timeouts (15 seconds).
* **The Fix:** I decoupled the frontend from the ML model. The Next.js frontend remains on Vercel, serving as a clean client dashboard. The heavy-duty Python threat detector and the TensorFlow autoencoder are hosted on a dedicated, persistent container runtime. We bridged the two using a secure Flask REST API with JSON payloads for real-time anomaly telemetry.

---

## 3. Future Roadmap: What to Build Next
Currently, Cybersicker processes historical PCAP log datasets. My next step is **live network interface capturing**.
* I plan to integrate `scapy` to capture live packets on a local network interface, parse them on-the-fly, stream the features directly to the Flask autoencoder model, and feed live alert logs to the portfolio dashboard using Server-Sent Events (SSE) or WebSockets.

---

## 4. Plan to Keep Building
To maintain momentum and keep improving Cybersicker:
* **Feature Update Plan:** Integrate support for standard Syslog formats (RFC 5424) so it can parse alerts from commercial firewalls.
* **Execution Reminder:** I have set a recurring calendar alarm for every Sunday at 4:00 PM to review newly published CVEs and update the Gemini Agent's prompt guidelines with fresh mitigation playbooks.
