# FL-08 Survive the Crit (Design Review)
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## 1. Reviewer Interview (The 10-Second Test)
We submitted the portfolio (`https://portfolio-git-master-vrishinrams-projects.vercel.app`) for Design Review to our mentor/peer. We asked two specific questions:
1. *In 10 seconds, what do I do?*  
   **Answer:** "You are a cybersecurity developer or SOC analyst who builds automated machine learning classifiers for threat detection."
2. *Would you believe I am good at it?*  
   **Answer:** "Yes, because instead of just listing 'Python' and 'ML', you show a detailed capstone project detailing TensorFlow accuracy statistics, dataset names (NSL-KDD), and LangChain pipelines."

---

## 2. Critique Feedback Categorisation

### Must-Fix (Confusing, Broken, or Weakens the Proof)
1. **Hero Claims Lack Immediate Focus:** The initial page load screen had "Hello, I'm Vrishin Ram K" in a huge font, but the role "Cybersecurity Analyst" was tiny and only appeared as the user scrolled. *Action: Rewrote the CSS/JS overlays so the title "Cybersecurity Analyst" and tagline are clearly displayed near the name on initial page load.*
2. **Missing Graduate Badge Link:** The footer badge was present but lacked a target URL mapping. *Action: Linked the badge directly to the verification portal (`https://internship.flyrank.ai/verify`).*
3. **Missing Explanations for Secondary Projects:** While the main project (Cybersicker) had rich explanations, the remaining 10 projects were simple titles with no technology cards. *Action: Updated the grid to display Tech tags for all 11 projects.*

### Nice-to-Have (Future Updates)
1. **Live Threat Map:** Suggestion to add a real-time reactive SVG map displaying simulated threat signals. *Action: Pushed to the post-graduation roadmap as a known limitation.*
2. **Theme Switcher (Light Mode):** Suggestion to add a light mode toggler. *Action: Rejected. The SOC Cockpit design is built natively as a dark-mode theme to keep high-contrast focus on raw data logs.*

---

## 3. Evidence of Must-Fix Deployments
All must-fixes have been addressed and merged to master. Pushing to `github.com/Vrishinram/portfolio` automatically deployed the corrections live. 
* The hero area now displays our title immediately under the name.
* The badge now links to the verification portal.
* Tech tag cards are rendered for all 11 projects in the grid.
