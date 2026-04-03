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

  // Text animations at scroll thresholds
  const nameOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [60, 0, 0, -40]);

  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [60, 0, 0, -40]);

  const taglineOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const taglineY = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [60, 0, 0, -40]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Master overlay visibility — fully hide after hero ends
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.01, 0.92, 1], [1, 1, 1, 0]);

  return (
    <div ref={containerRef} className={styles.hero}>
      {/* The canvas handles its own scroll container */}
      <ImageSequenceCanvas />

      {/* Overlay text layer — fixed but scoped to hero via master opacity */}
      <motion.div
        className={styles.overlay}
        style={{ opacity: overlayOpacity }}
      >
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
      </motion.div>

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
  );
}
