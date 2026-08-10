# FL-06 Explain It Like You Built It
**Author:** Vrishin Ram K  
**Project:** Cybersicker — Dual-Core Autonomous SOC AI Agent  

---

## 1. Chosen Topic: Scroll-Driven Canvas Frame Renderer (`ImageSequenceCanvas.tsx`)
In our hero section, we display an interactive 3D packet-flow visualization that scrolls forward or backward in perfect sync with the user's scrollbar. To achieve this without loading a heavy, sluggish video file, we built a custom HTML `<canvas>` renderer. 

Here is how the code works in plain English:

---

## 2. Plain-English Walkthrough

### Step 1: Pre-loading the Images (The Cache)
When a visitor first lands on the page, the browser runs a React `useEffect` hook to load 60 individual high-quality images (representing consecutive frames of a 3D network topology animation) into memory. We store these preloaded images in a JavaScript array. This ensures that when the user starts scrolling, the browser doesn't freeze or lag trying to download images on-the-fly.

### Step 2: Tracking the Scroll Progress
Using the `useScroll` hook from `framer-motion`, we get a real-time number representing how far the user has scrolled down the hero section. This number ranges from `0.0` (at the top) to `1.0` (fully scrolled past the hero). 

### Step 3: Mapping Scroll to Frame Index
We map that `0.0` to `1.0` progress value to our 60 preloaded images. If the progress is `0.5` (halfway scrolled), Next.js calculates:
$$\text{Frame Index} = \text{Math.floor}(0.5 \times 59) = 29$$
It fetches the 30th image from our preloaded array.

### Step 4: Drawing on the Canvas
Finally, we get the HTML `<canvas>` element using a React ref and fetch its 2D drawing context (`context.drawImage()`). The code clears the canvas and draws the current frame. Because this happens inside a scroll listener, the images swap fast enough to look like a smooth, responsive video that the user is controls with their mouse.

---

## 3. Why This Design Beats the Alternatives
* **No Video Latency:** Standard HTML5 `<video>` tags are notoriously laggy when you try to force them to scrub frame-by-frame on scroll. They stutter, buffer, and drain CPU.
* **Low Payload Size:** Our 60 WebP image sequence combined is less than 1.2MB, which is significantly lighter than an equivalent 4K mp4 video file.
* **Pixel-Perfect Sync:** Using a Canvas lets us ensure the animation frame lines up precisely with our layout text overlays.
