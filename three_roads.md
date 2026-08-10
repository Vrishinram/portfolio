# Three Roads: Choose Your Stack with AI
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## 1. Project Constraints
* **Cost:** $0 (Free tiers only for hosting, databases, and APIs).
* **Skill Level:** Intermediate full-stack developer (comfortable with React, Node.js, and Python).
* **Portfolio Needs:** Must present a grid of 11 distinct tools, support a high-fidelity scroll-based canvas animation for the hero section, and connect to a Python-based threat telemetry API.
* **Work Display:** Code repositories, interactive canvas telemetry, and long-form markdown logs.
* **Dynamic Features:** Contact form, active API communication with a machine learning back-end.

---

## 2. The Three Stack Options Evaluated

### Option 1: Visual No-Code (Carrd / Framer)
* **How to Build:** Drag and drop in Framer.
* **Where to Host:** Framer Free Subdomain.
* **Backend:** None.
* **Trade-off:** Fast to build and has great image grids, but completely fails our requirements. We cannot implement the custom React-based scroll canvas canvas rendering logic or easily route API telemetry payloads from our TensorFlow model.

### Option 2: Plain Static Code (HTML, CSS, Vanilla JS)
* **How to Build:** Write manual index.html, styles.css, and app.js.
* **Where to Host:** Netlify (Free Drag-and-Drop).
* **Backend:** Not yet (static forms via Netlify forms).
* **Trade-off:** Extremely lightweight and fast loading. However, managing complex scroll state, animations, Canvas canvas sequences, and REST client code in vanilla JS becomes messy, error-prone, and hard to structure as the page grows.

### Option 3: Full-Stack React (Next.js 16 + React 19 + Python Flask) [CHOSEN]
* **How to Build:** Build the frontend with Next.js (CSS Modules + Framer Motion) and the ML engine with a Flask REST API.
* **Where to Host:** Frontend on **Vercel** (Free Tier), Python Backend containerized.
* **Backend:** Yes (Flask for ML inference).
* **Trade-off:** High setup complexity. We must manage package size limits, environment variables, and asynchronous fetches. However, it perfectly shows our capabilities in software architecture, enables seamless custom WebGL/Canvas canvas logic, and runs Python ML logic on real packet anomalies.

---

## 3. Rationale: Why Next.js + Flask
We chose **Next.js on Vercel** because our portfolio is not just an online resume; it is itself a piece of software engineering proof. The scroll-responsive `ImageSequenceCanvas.tsx` requires precise React control, and our TensorFlow threat modeling requires a real Python Flask API backend. 

* *Can I maintain this?* Yes. Next.js App Router keeps our components isolated, and decoupling the ML backend prevents Vercel cold-start timeouts and package size limitations.
