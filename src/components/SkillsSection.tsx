'use client';

import { motion } from 'framer-motion';
import styles from './SkillsSection.module.css';

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Cybersecurity',
    icon: '🛡️',
    skills: ['SOC Analysis', 'Incident Response', 'Blue Teaming', 'Digital Forensics', 'ICS/SCADA Security'],
  },
  {
    title: 'Tools & Platforms',
    icon: '🔧',
    skills: ['Wireshark', 'Splunk', 'Nmap', 'Autopsy', 'Kali Linux'],
  },
  {
    title: 'Development',
    icon: '💻',
    skills: ['Python', 'C', 'Bash Scripting', 'HTML/CSS/JS', 'Next.js / React'],
  },
  {
    title: 'AI & Emerging Tech',
    icon: '🧠',
    skills: ['Agentic AI', 'Generative AI', 'Prompt Engineering', 'Quantum Computing', 'MongoDB'],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.span className="section-label" variants={itemVariants}>
          Tech Arsenal
        </motion.span>

        <motion.h2 variants={itemVariants} style={{ marginBottom: 'var(--space-xl)' }}>
          Skills &amp; <span className="grad-text">expertise</span>
        </motion.h2>

        <div className={styles.grid}>
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              className={`glass-card ${styles.card}`}
              variants={itemVariants}
            >
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{cat.icon}</span>
                <h3>{cat.title}</h3>
              </div>
              <ul className={styles.list}>
                {cat.skills.map((s) => (
                  <li key={s} className={styles.item}>
                    <span className="glow-dot" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
