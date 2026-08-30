'use client';

import { motion } from 'framer-motion';
import styles from './ProjectsSection.module.css';

interface Project {
  title: string;
  description: string;
  tech: string[];
  color: string;
  liveUrl?: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: 'Cybersicker – Dual-Core Autonomous SOC',
    description:
      'Dual-core autonomous SOC system combining a Gemini 2.5 Flash agentic AI engine with a TensorFlow deep learning autoencoder to detect IoT attacks including botnet infections, DDoS, and ransomware. Includes 5 autonomous investigation tools.',
    tech: ['Python', 'Gemini 2.5', 'TensorFlow', 'LangChain'],
    color: 'var(--accent-cyan)',
    githubUrl: 'https://github.com/Vrishinram/Cybersicker',
  },
  {
    title: 'Cyberguard – Password Security Suite',
    description:
      'Real-time client-side evaluation of password complexity, Shannon entropy, keyboard pattern, and Have I Been Pwned breach validation via API using k-anonymity.',
    tech: ['JavaScript', 'HTML5', 'HIBP API'],
    color: '#00FF88',
    liveUrl: 'https://vrishinram.github.io/Cyberguard/',
    githubUrl: 'https://github.com/Vrishinram/Cyberguard',
  },
  {
    title: 'BruteShield – Adaptive Brute-Force Defense',
    description:
      'Interactive mitigation tool and security dashboard simulating adaptive progressive lockouts, IP threat tracking, and real-time defense against brute-force intrusion attempts.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Mitigation'],
    color: '#00FF88',
    liveUrl: 'https://vrishinram.github.io/BruteShield/',
    githubUrl: 'https://github.com/Vrishinram/BruteShield',
  },
  {
    title: 'CyDetect – ML Email Threat Classifier',
    description:
      'Developed a machine learning-powered email threat classifier that categorizes messages into five types: phishing, malware, BEC, spam, and safe using a Random Forest classifier and NLP pipeline.',
    tech: ['Python', 'Scikit-learn', 'NLP', 'NLTK'],
    color: 'var(--accent-orange)',
    githubUrl: 'https://github.com/Vrishinram/CyDetect',
  },
  {
    title: 'CyAuth – Secure Authentication Engine',
    description:
      'Architected a secure full-stack authentication platform. Pairs a Node.js/Express backend handling authentication logic and SQLite integration with a React frontend.',
    tech: ['Node.js', 'React', 'Express', 'JWT'],
    color: 'var(--accent-blue)',
    githubUrl: 'https://github.com/Vrishinram/CyAuth',
  },
  {
    title: 'rootsecurity – OWASP Top 10 Assessment',
    description:
      'Interactive OWASP Top 10 security assessment web platform for startup applications covering 5 attack surfaces with live interactive vulnerability demos and automated PDF report generation.',
    tech: ['TypeScript', 'React', 'TanStack', 'Tailwind'],
    color: '#ec4899',
    githubUrl: 'https://github.com/Vrishinram/rootsecuity',
  },
  {
    title: 'Port-Checker – Flask TCP Scan Tracker',
    description:
      'Check whether TCP ports are open or closed on any host. Designed with a custom Flask/Python scanning backend and a responsive vanilla JS frontend.',
    tech: ['Python', 'Flask', 'TCP', 'JavaScript'],
    color: '#10b981',
    githubUrl: 'https://github.com/Vrishinram/Port-Checker',
  },
  {
    title: 'hushh-research – Threat Feeds & Cryptography',
    description:
      'Open-source research project containing custom threat feeds, security playbooks, and research on quantum computing foundations and its impact on modern cryptography.',
    tech: ['Python', 'Quantum', 'Threat Intelligence'],
    color: '#84cc16',
    liveUrl: 'https://kai.hushh.ai',
    githubUrl: 'https://github.com/Vrishinram/hushh-research',
  },
  {
    title: 'Obfuscator – Secure Cryptographic Scrambler',
    description:
      'File obfuscation tool implementing access control logic, key-based scrambling, and metadata hashing to prevent unauthorized access and data exfiltration.',
    tech: ['Python', 'Cryptography', 'Hashing'],
    color: '#eab308',
    githubUrl: 'https://github.com/Vrishinram/Obfuscator',
  },
  {
    title: 'CyRecon – Network Reconnaissance Wrapper',
    description:
      'Automated network reconnaissance and vulnerability mapper wrapper. Scanned hosts using Nmap, resolved active services, and cross-referenced threat feeds.',
    tech: ['Python', 'Nmap', 'Recon', 'OS'],
    color: '#06b6d4',
    githubUrl: 'https://github.com/Vrishinram/CyRecon',
  },
  {
    title: 'TriadSec – Threat Intelligence Parser',
    description:
      'Threat intelligence parsing and secure compliance scanner utility mapping systems against GRC requirements, evaluating confidentiality, integrity, and availability.',
    tech: ['Python', 'SQLite', 'GRC', 'Compliance'],
    color: '#6366f1',
    githubUrl: 'https://github.com/Vrishinram/-TriadSec',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function ProjectsSection() {
  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.span className="section-label" custom={0} variants={cardVariants}>
          Featured Work
        </motion.span>

        <motion.h2 custom={0} variants={cardVariants} style={{ marginBottom: 'var(--space-xl)' }}>
          Projects that push<br />
          <span className="grad-text">boundaries</span>
        </motion.h2>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className={`glass-card ${styles.card}`}
              custom={i + 1}
              variants={cardVariants}
            >
              <div
                className={styles.cardAccent}
                style={{ background: project.color }}
              />
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.cardActions}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveBtn}
                  >
                    <span className={styles.pulseDot} />
                    Live Demo ↗
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubBtn}
                >
                  GitHub ↗
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
