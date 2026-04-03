'use client';

import { motion } from 'framer-motion';
import styles from './ProjectsSection.module.css';

interface Project {
  title: string;
  description: string;
  tech: string[];
  color: string;
}

const projects: Project[] = [
  {
    title: 'Cybersicker – Agentic AI for Cybersecurity',
    description:
      'Autonomous AI agent engineered to assist with security operations, threat analysis, and automated responses. Implements intelligent workflows to streamline blue teaming tasks and enhance incident response.',
    tech: ['Python', 'Generative AI', 'Prompt Engineering', 'Agentic AI'],
    color: 'var(--accent-cyan)',
  },
  {
    title: 'CyberAudit Pro – ISO 27001 Compliance Scanner',
    description:
      'Multithreaded GUI application for automated web vulnerability and risk auditing. Features dynamic scoring aligned with ISO 27001 compliance standards and automated security header checks.',
    tech: ['Python', 'Tkinter', 'Threading', 'ISO 27001'],
    color: 'var(--accent-orange)',
  },
  {
    title: 'Cyberite – All-in-One Cybersecurity Platform',
    description:
      'Comprehensive SOC dashboard with custom log parser, real-time incident feeds, VirusTotal API integration, network scanner, and a secure AES-256-GCM encrypted data vault.',
    tech: ['Next.js', 'FastAPI', 'Web Crypto API', 'VirusTotal'],
    color: 'var(--accent-blue)',
  },
  {
    title: 'FINOVATE – Secure ERP & Finance System',
    description:
      'Offline-first financial ERP application with role-based access control, complete audit trails, real-time compliance dashboard, and glassmorphism-based corporate UI.',
    tech: ['.NET', 'SQLite', 'RBAC', 'UI/UX Design'],
    color: '#a855f7',
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
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
