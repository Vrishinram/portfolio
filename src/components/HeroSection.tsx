'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ImageSequenceCanvas from './ImageSequenceCanvas';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Seamless non-overlapping text flow with immediate initial visibility
  const nameOpacity = useTransform(scrollYProgress, [0, 0.22, 0.30], [1, 1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 0.22, 0.30], [0, 0, -35]);

  const titleOpacity = useTransform(scrollYProgress, [0.28, 0.36, 0.56, 0.64], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.28, 0.36, 0.56, 0.64], [35, 0, 0, -35]);

  const taglineOpacity = useTransform(scrollYProgress, [0.62, 0.70, 0.88, 0.96], [0, 1, 1, 0]);
  const taglineY = useTransform(scrollYProgress, [0.62, 0.70, 0.88, 0.96], [35, 0, 0, -35]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className={styles.hero}>
      <div className={styles.stickyWrapper}>
        <ImageSequenceCanvas scrollYProgress={scrollYProgress} />

        {/* Subtle dark vignette overlay for crisp contrast & seamless background blend */}
        <div className={styles.canvasGradient} />

        {/* Overlay text layers pinned inside the sticky viewport */}
        <div className={styles.overlay}>
          <motion.div
            className={styles.textBlock}
            style={{ opacity: nameOpacity, y: nameY }}
          >
            <span className={styles.greeting}>Hello, I&apos;m</span>
            <h1 className={styles.name}>
              <span className="grad-text">Vrishin Ram K</span>
            </h1>
          </motion.div>

          <motion.div
            className={styles.textBlock}
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <h2 className={styles.title}>
              Cybersecurity Analyst
            </h2>
            <p className={styles.subtitle}>
              Blue Teaming &amp; SOC Operations
            </p>
          </motion.div>

          <motion.div
            className={styles.textBlock}
            style={{ opacity: taglineOpacity, y: taglineY }}
          >
            <p className={styles.tagline}>
              Securing digital frontiers with<br />
              threat intelligence &amp; agentic AI.
            </p>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className={styles.scrollHint}
          style={{ opacity: scrollHintOpacity }}
        >
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot} />
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </div>
  );
}

