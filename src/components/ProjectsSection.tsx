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
    title: 'Cybersicker – Dual-Core Autonomous SOC AI',
    description:
      'Dual-core autonomous SOC combining an LLM agentic engine (Gemini 2.5 Flash + LangChain) with a deep learning autoencoder, detecting 5+ IoT attack types with 95%+ accuracy. Unified 5 investigation tools with real-time Streamlit dashboard mapped to MITRE ATT&CK and NIST CSF 2.0.',
    tech: ['Python', 'LangChain', 'Gemini 2.5 Flash', 'TensorFlow/Keras', 'ChromaDB', 'Streamlit'],
    color: 'var(--accent-cyan)',
    githubUrl: 'https://github.com/Vrishinram/Cybersicker',
  },
  {
    title: 'CyDetect – Advanced AI Phishing & Threat Classifier',
    description:
      'Trained a Random Forest classifier on 10,000+ samples across 5 threat categories (phishing, malware, BEC, spam, safe) with a 6-dimensional NLP feature extraction pipeline and real-time Flask analytics dashboard.',
    tech: ['Python', 'Flask', 'Scikit-learn', 'NLTK', 'TF-IDF', 'Chart.js'],
    color: 'var(--accent-orange)',
    githubUrl: 'https://github.com/Vrishinram/CyDetect',
  },
  {
    title: 'CyGuard – Password Strength & Breach Analyzer',
    description:
      'Enterprise-grade password analyzer rating credentials across 5 strength tiers using 6 evaluation dimensions and validating against 10+ billion breached records via Have I Been Pwned k-anonymity API with zero raw-password exposure.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'HIBP API', 'k-Anonymity'],
    color: '#00FF88',
    liveUrl: 'https://vrishinram.github.io/Cyberguard/',
    githubUrl: 'https://github.com/Vrishinram/Cyberguard',
  },
  {
    title: 'BruteShield – Adaptive Brute-Force Defense System',
    description:
      'Authentication protection system enforcing progressive account lockouts, dynamic delay escalation, and real-time suspicious-IP flagging to actively block credential-stuffing and intrusion attempts.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Defense Engineering'],
    color: '#00FF88',
    liveUrl: 'https://vrishinram.github.io/BruteShield/',
    githubUrl: 'https://github.com/Vrishinram/BruteShield',
  },
  {
    title: 'CyAuth – OWASP Top 10 Authentication System',
    description:
      'Production-grade full-stack auth platform engineered with bcrypt hashing, JWT session security, and rate-limiting aligned to OWASP Top 10 guidelines, reducing attack surface exposure by 30%.',
    tech: ['Node.js', 'Express.js', 'React', 'Vite', 'JWT', 'Bcrypt'],
    color: 'var(--accent-blue)',
    githubUrl: 'https://github.com/Vrishinram/CyAuth',
  },
  {
    title: 'rootsecurity – OWASP Top 10 Web Security Audit',
    description:
      'Interactive security assessment web platform covering 5 web application attack surfaces with live interactive vulnerability demos and automated executive PDF audit report generation.',
    tech: ['TypeScript', 'React 19', 'TanStack', 'Tailwind CSS'],
    color: '#ec4899',
    githubUrl: 'https://github.com/Vrishinram/rootsecuity',
  },
  {
    title: 'Port-Checker – High-Speed Subnet Port Scanner',
    description:
      'Multi-threaded port scanning utility capable of enumerating a full Class-C subnet in under 30 seconds, cutting manual network reconnaissance time by 70%.',
    tech: ['Python', 'Multi-threading', 'TCP/IP', 'Flask', 'JavaScript'],
    color: '#10b981',
    githubUrl: 'https://github.com/Vrishinram/Port-Checker',
  },
  {
    title: 'Obfuscator – Layered XOR File Security Utility',
    description:
      'File access-control and anti-exfiltration utility applying layered XOR encryption and role-based access permissions across 3+ sensitive asset categories.',
    tech: ['Python', 'Layered XOR', 'Cryptography', 'Access Control'],
    color: '#eab308',
    githubUrl: 'https://github.com/Vrishinram/Obfuscator',
  },
  {
    title: 'CyRecon – Automated Recon & Service Fingerprinting',
    description:
      'Reconnaissance automation wrapper executing Nmap port scans, operating system fingerprinting, and service enumeration against live endpoints.',
    tech: ['Python', 'Nmap', 'OS Fingerprinting', 'Recon Automation'],
    color: '#06b6d4',
    githubUrl: 'https://github.com/Vrishinram/CyRecon',
  },
  {
    title: 'TriadSec – Threat Intelligence & Compliance Scanner',
    description:
      'Security compliance scanner utility evaluating enterprise infrastructure against CIA triad and GRC requirements with automated SQLite audit logging.',
    tech: ['Python', 'SQLite', 'GRC', 'Compliance Auditing'],
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
