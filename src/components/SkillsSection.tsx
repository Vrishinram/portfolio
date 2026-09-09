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
    title: 'Cybersecurity & Blue Teaming',
    icon: '🛡️',
    skills: [
      'SOC Analysis & Alert Triage',
      'Incident Response & DFIR',
      'Digital Forensics (Autopsy)',
      'SIEM Operations (Splunk)',
      'Threat Intelligence & IOCs',
      'Network Traffic Analysis (Wireshark)',
      'ICS/SCADA Security Basics',
      'Kali Linux Operations',
    ],
  },
  {
    title: 'AI Security & Red Teaming',
    icon: '🤖',
    skills: [
      'LLM Security & Red Teaming',
      'Prompt Injection & Jailbreak Mitigation',
      'LLM Safety & Output Drift Evaluation',
      'Agentic AI Architectures',
      'Autonomous Reasoning Pipelines',
      'Adversarial Attack Simulation',
    ],
  },
  {
    title: 'Frameworks & Standards',
    icon: '📋',
    skills: [
      'MITRE ATT&CK (Enterprise & ICS)',
      'NIST Cybersecurity Framework 2.0',
      'ISO/IEC 27001:2022 ISMS',
      'OWASP Top 10 Web Security',
      'OWASP Top 10 for LLMs',
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '🔧',
    skills: [
      'Wireshark (Deep Packet Capture)',
      'Splunk SIEM',
      'Nmap (Recon & Fingerprinting)',
      'Autopsy Forensic Suite',
      'Cisco Packet Tracer',
      'VMware Workstation',
      'Metasploit (Basics)',
      'VS Code & Git/GitHub',
    ],
  },
  {
    title: 'AI, ML & LLMs',
    icon: '🧠',
    skills: [
      'LangChain Framework',
      'Anthropic Claude API',
      'Google Gemini 2.5 Flash',
      'Scikit-learn & NLTK',
      'TensorFlow / Keras Autoencoders',
      'RAG & ChromaDB Vector Stores',
      'HuggingFace Embeddings',
      'Prompt Architecture',
    ],
  },
  {
    title: 'Programming & Backend',
    icon: '💻',
    skills: [
      'Python (Automation & Security Tooling)',
      'C Programming',
      'Bash / Shell Scripting',
      'JavaScript (ES6+) / TypeScript',
      'SQL & Database Security',
      'Node.js & Express.js',
      'React & Next.js',
      'Flask REST APIs & MongoDB',
    ],
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
