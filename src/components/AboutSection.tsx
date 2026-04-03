'use client';

import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={styles.inner}
      >
        <motion.span className="section-label" custom={0} variants={fadeUp}>
          About Me
        </motion.span>

        <motion.h2 custom={1} variants={fadeUp}>
          Driven by a mission to<br />
          <span className="grad-text">secure &amp; defend</span> the digital world
        </motion.h2>

        <motion.p custom={2} variants={fadeUp} className={styles.bio}>
          I&apos;m a 3rd-year B.Tech Cybersecurity student with a strong foundation
          in blue teaming, incident response, and SOC analysis. With hands-on
          internship experience at Vetri Technologies and multiple industry
          certifications including ISO/IEC 27001 Lead Auditor, I combine
          technical expertise with a passion for building intelligent security
          solutions — from agentic AI systems to compliance scanners.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} className={styles.stats}>
          {[
            { value: '7.1', label: 'CGPA' },
            { value: '5+', label: 'Certifications' },
            { value: '4+', label: 'Projects' },
            { value: '1st', label: 'IIT Madras Hackathon' },
          ].map((s) => (
            <div key={s.label} className={`glass-card ${styles.stat}`}>
              <span className={styles.statVal}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative accent orbs */}
      <div className={styles.orbBlue} />
      <div className={styles.orbOrange} />
    </section>
  );
}
