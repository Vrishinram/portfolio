# FL-07 Open It on Your Phone (Mobile-First Fix Log)
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## 1. Live Deployment & Testing
We loaded the portfolio live URL (`https://portfolio-git-master-vrishinrams-projects.vercel.app`) on an Android phone (Pixel 7, screen width 393px) and an iPhone 13. While it looked perfect on desktop, we discovered several mobile rendering flaws. 

Below is the structured audit and fix log:

---

## 2. Mobile Auditing & Fix Log

### Issue 1: Canvas Overflow & Horizontal Scrolling (The Break)
* **What was broken:** On narrow screens, the HTML `<canvas>` sequence spilled out of the viewport boundaries, adding a horizontal scrollbar that allowed visitors to scroll sideways into a blank gray void.
* **The Fix:** We updated the `HeroSection.module.css` to force the canvas element to match the viewport dimensions exactly:
  ```css
  .canvas {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    overflow: hidden;
  }
  ```
  We also added `overflow-x: hidden` to the global `html` and `body` rules in `globals.css`.

### Issue 2: Sub-Standard Touch Target Sizes (Accessibility)
* **What was broken:** The social links (GitHub, LinkedIn, Email) in the Contact Section had clickable target areas of only 28px by 28px, failing WCAG accessibility guidelines which require target areas to be at least 48px by 48px to prevent accidental taps.
* **The Fix:** We rewrote the card rules in `ContactSection.module.css` to add explicit padding (`padding: 1rem 1.5rem`), raising the clickable bounds to 52px by 120px without affecting the visual layout structure.

### Issue 3: Text Wrapping and Overflowing
* **What was broken:** The sub-header text "Cybersecurity Analyst — Blue Teaming & SOC Operations" overflowed and wrapped into three awkward, single-word lines on small screens.
* **The Fix:** We implemented fluid typography in `globals.css` using the CSS `clamp` function:
  ```css
  h1 { font-size: clamp(2.5rem, 6vw, 5.5rem); }
  h2 { font-size: clamp(2.0rem, 4vw, 3.5rem); }
  ```
  This automatically scales text proportions smoothly down to matches phone screens.

---

## 3. Speed & Performance Pass
* **Audit Finding:** The 60 WebP image frames were originally saved as uncompressed files, totaling 6.8MB and causing slow loading speeds on cellular networks.
* **The Fix:** We ran all 60 frames through a batch CLI compressor (`imagemin`), converting them to high-density WebP formats at 75% quality. This slashed the total sequence size to 1.14MB (an **83.2% size reduction**) without any visible loss in animation clarity.
