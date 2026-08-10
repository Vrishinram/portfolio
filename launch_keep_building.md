# Week 9: Break Your Own Site & Launch Checklist
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## 1. Attack Log (Try to Break Your Site)
We ran a series of edge-case tests to check how our portfolio handles failures:

### Test 1: High-Frequency API Spamming
* **The Attack:** We wrote a local bash loop scripting 50 consecutive POST threat payloads to our Flask backend in under 5 seconds.
* **The Break:** The serverless instance memory quickly exhausted, and Gemini API rate-limits were reached, causing the server to return 429 rate-limit errors.
* **The Fix (Fix-Now):** We integrated `Flask-Limiter` middleware on our Python server, enforcing a hard limit of 5 API anomaly scans per minute per IP address. Spam requests now fail gracefully with a custom JSON error, protecting our infrastructure.

### Test 2: Disabling JavaScript in Browser
* **The Attack:** Disabled JavaScript via Chrome DevTools and refreshed the page.
* **The Break:** The scroll-driven Canvas component was blank, and the main project list failed to render because the React cards depended on dynamic client hydration.
* **The Fix (Fix-Now):** We added an elegant `<noscript>` container mapping the static sitemap, project titles, and contact information directly in the HTML layout so the page remains indexable and readable by search engines and accessibility crawlers even without JS.

### Test 3: Missing Image Frame Sequence Files
* **The Attack:** Simulated a slow network where canvas frame WebP images failed to load before user scroll.
* **The Break:** The hero canvas area remained a blank void.
* **The Fix (Fix-Now):** Added a static high-resolution background SVG template that renders as a loader until the frame sequence cache reports 100% load progress.

---

## 2. SEO & Open Graph Meta Tags
We configured proper meta headers in `src/app/layout.tsx` to handle search engine discovery and chat link preview styling:
* **Page Title:** `Vrishin Ram K — Cybersecurity Analyst & Developer`
* **Meta Description:** `Portfolio of Vrishin Ram K — Cybersecurity Analyst, Blue Teaming specialist, and Full-Stack Developer from Tamil Nadu, India.`
* **Keywords:** `cybersecurity, portfolio, SOC analyst, blue teaming, Next.js, Vrishin Ram K`
* **Open Graph Title:** `Vrishin Ram K — Cybersecurity Analyst & Developer`
* **Open Graph Description:** `Securing digital frontiers with threat intelligence & agentic AI.`
* **Favicon:** Active vector shield icon.

---

## 3. Custom Domain & Analytics
* **Host Address:** `https://portfolio-git-master-vrishinrams-projects.vercel.app` (secured over SSL/HTTPS).
* **Analytics Integration:** We integrated **Vercel Web Analytics** by adding `<Analytics />` package tracking parameters to log page views and visitor locations without violating user privacy.

---

## 4. Plan to Keep Building
To ensure the portfolio doesn't collect dust after graduation, we follow this structured 30-minute plan:
1. **The 30-Minute Feature Addition Checklist:**
   * Create a new folder under `D:\portfolio\src\projects\<project_name>`.
   * Add a concise, 3-beat markdown write-up: (1) The Challenge, (2) The Proof/Implementation, (3) The Learning.
   * Register the project item inside the `projects` object array in `src/components/ProjectsSection.tsx`.
   * Push changes to GitHub (`git commit && git push`) and verify Vercel completes deployment.
2. **Upcoming Case Study:**
   * *Target Project:* "CyRecon Network Reconnaissance Web Console Integration"
   * *Execution Reminder:* Set a recurring calendar reminder for every alternate Saturday morning at 10:00 AM to update files.
