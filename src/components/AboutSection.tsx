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
          I&apos;m a 4th-year B.Tech Cybersecurity student with five hands-on industry internships
          spanning SOC analysis, blue teaming, AI/LLM security, network security, incident
          response, and security tool development. First-author of a peer-reviewed IoT intrusion
          detection paper (Impact Factor 8.76, 98.31% accuracy), holder of 10+ certifications
          including ISO/IEC 27001:2022 Lead Auditor, Certified LLM Security Expert (CLLMSE),
          and COFPS.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} className={styles.stats}>
          {[
            { value: '5', label: 'Industry Internships' },
            { value: '10+', label: 'Certifications' },
            { value: '98.3%', label: 'IoT Detection (IF 8.76)' },
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
