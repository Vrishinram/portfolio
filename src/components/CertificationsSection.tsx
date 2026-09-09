'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CertificationsSection.module.css';

interface CertItem {
  id: string;
  category: 'cert' | 'research' | 'award';
  title: string;
  issuerOrVenue: string;
  date: string;
  description: string;
  metrics?: string[];
  icon: string;
  badge: string;
}

const items: CertItem[] = [
  // Certifications
  {
    id: 'iso-27001',
    category: 'cert',
    title: 'ISO/IEC 27001:2022 Lead Auditor',
    issuerOrVenue: 'Exemplar Global',
    date: '2026',
    description:
      'Certified Lead Auditor for Information Security Management Systems (ISMS), auditing enterprise controls, compliance posture, and risk governance.',
    metrics: ['ISMS Lead Auditor', 'Exemplar Global'],
    icon: '📜',
    badge: 'Auditor Credential',
  },
  {
    id: 'cllmse',
    category: 'cert',
    title: 'Certified LLM Security Expert (CLLMSE)',
    issuerOrVenue: 'AI Security Council',
    date: '2026',
    description:
      'Specialized in LLM red teaming, prompt injection & jailbreak defenses, agentic safety evaluation, and adversarial robustness.',
    metrics: ['LLM Red Teaming', 'Jailbreak Defense', 'AI Safety'],
    icon: '🤖',
    badge: 'AI Security',
  },
  {
    id: 'ccep',
    category: 'cert',
    title: 'Certified Cybersecurity Educator Professional (CCEP)',
    issuerOrVenue: 'Cybersecurity Education Board',
    date: '2026',
    description:
      'Recognized credential for designing hands-on cybersecurity curriculum, CTF challenges, and technical training programs.',
    metrics: ['Curriculum Design', 'Technical Mentorship'],
    icon: '👨‍🏫',
    badge: 'Educator',
  },
  {
    id: 'cofps',
    category: 'cert',
    title: 'Certified Online Fraud Prevention Specialist (COFPS)',
    issuerOrVenue: 'Fraud Prevention Board',
    date: '2026',
    description:
      'Expertise in digital fraud analysis, credential theft mitigation, payment security vectors, and account takeover defense.',
    metrics: ['Anti-Fraud', 'Credential Stuffing Defense'],
    icon: '🛡️',
    badge: 'Fraud Prevention',
  },
  {
    id: 'anthropic-ai',
    category: 'cert',
    title: 'Anthropic AI Fluency Series & Claude 101',
    issuerOrVenue: 'Anthropic & CodePath.org',
    date: '2026',
    description:
      'Mastery across Claude 101, Framework & Foundations, Capabilities & Limitations, and AI Fluency for Builders.',
    metrics: ['Claude API', 'Autonomous Reasoning', 'Prompt Architecture'],
    icon: '🧠',
    badge: 'AI Fluency',
  },
  {
    id: 'offensive-agent-ai',
    category: 'cert',
    title: 'Offensive Agent AI Course',
    issuerOrVenue: 'Offensive AI Security',
    date: '2026',
    description:
      'Trained in autonomous agent attack surfaces, memory poisoning, agent tool-abuse vectors, and agentic red teaming.',
    metrics: ['Agent Exploits', 'Memory Poisoning'],
    icon: '🎯',
    badge: 'Offensive AI',
  },
  {
    id: 'soc-forensics',
    category: 'cert',
    title: 'SOC Fundamentals & Digital Forensics',
    issuerOrVenue: 'Industry Training',
    date: '2025 – 2026',
    description:
      'Hands-on expertise in Splunk SIEM operations, Wireshark packet dissection, Autopsy forensic investigation, and ICS/SCADA basics.',
    metrics: ['Splunk SIEM', 'Autopsy', 'ICS/SCADA Basics'],
    icon: '🔍',
    badge: 'Blue Teaming',
  },

  // Research
  {
    id: 'research-iot',
    category: 'research',
    title: 'Cyberattacks Detection Through IoT Environment via Hybrid Intelligence',
    issuerOrVenue: 'International Journal of Novel Research and Development (IJNRD)',
    date: 'May 2026',
    description:
      'First-authored IMFOHDL-ID framework combining Improved Mayfly Optimization with LSTM-DSSAE deep learning autoencoder. Outperformed 6 baseline models on BoT-IoT dataset across 9 attack categories.',
    metrics: ['Impact Factor 8.76', '98.31% Accuracy', '92.09% Precision', 'ISSN: 2456-4184'],
    icon: '📄',
    badge: 'Impact Factor 8.76',
  },
  {
    id: 'research-blockchain',
    category: 'research',
    title: 'Integration of Blockchain Technology in Database Management System',
    issuerOrVenue: "ICIAAIEA '24 International Conference",
    date: 'Jul 2024',
    description:
      'Presented peer-reviewed research on a decentralised, tamper-proof database integrity architecture using blockchain consensus and cryptographic hashing.',
    metrics: ['Peer-Reviewed Conference', 'Cryptographic Hashing'],
    icon: '⛓️',
    badge: 'Conference Paper',
  },

  // Awards & Hackathons
  {
    id: 'award-iit-madras',
    category: 'award',
    title: '1st Place — Ethical Hacking Hackathon',
    issuerOrVenue: 'Techgyan @ IIT Madras Research Park',
    date: 'May 2025',
    description:
      'Ranked #1 out of competitive teams in high-stakes penetration testing, vulnerability exploitation, and CTF challenges.',
    metrics: ['1st Place Champion', 'IIT Madras Research Park'],
    icon: '🏆',
    badge: '1st Place',
  },
  {
    id: 'award-erp',
    category: 'award',
    title: '1st Prize — ERP-Design Competition',
    issuerOrVenue: "Science Tech Fest '25, DSU",
    date: 'Oct 2025',
    description:
      'Engineered a scalable, secure enterprise resource planning system architecture with robust role-based access control.',
    metrics: ['1st Prize Winner', 'Secure Architecture'],
    icon: '🥇',
    badge: '1st Prize',
  },
  {
    id: 'award-avinya',
    category: 'award',
    title: '1st Prize — Strategic Event IPL Auction',
    issuerOrVenue: "AVINYA '25, K. Ramakrishnan College of Engineering",
    date: 'Apr 2025',
    description:
      'Applied analytical optimization and resource allocation models under rapid competitive bidding conditions.',
    metrics: ['1st Prize Winner', 'Strategy & Optimization'],
    icon: '⚡',
    badge: '1st Prize',
  },
  {
    id: 'award-xrverse',
    category: 'award',
    title: "1st Prize — XRVerse Event ('City Cruise')",
    issuerOrVenue: 'VISTAQuest 2K26',
    date: 'Mar 2026',
    description:
      'Built and demonstrated an immersive extended reality (XR) interactive experience with real-time responsive physics.',
    metrics: ['1st Prize Winner', 'XR & Real-Time Tech'],
    icon: '🌐',
    badge: '1st Prize',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function CertificationsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'cert' | 'research' | 'award'>('all');

  const filtered = items.filter((item) =>
    activeTab === 'all' ? true : item.category === activeTab
  );

  return (
    <section id="credentials" className={`section ${styles.certifications}`}>
      <div className={styles.inner}>
        <span className="section-label">Validation</span>
        <h2 style={{ marginBottom: 'var(--space-md)' }}>
          Certifications &amp; <span className="grad-text">Research</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', maxWidth: '640px' }}>
          ISO/IEC 27001 Lead Auditor, Certified LLM Security Expert, peer-reviewed IoT security publications (Impact Factor 8.76), and hackathon championships.
        </p>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({items.length})
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'cert' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('cert')}
          >
            Certifications (7)
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'research' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('research')}
          >
            Research Publications (2)
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'award' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('award')}
          >
            Awards &amp; Hackathons (4)
          </button>
        </div>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                custom={i}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                variants={cardVariants}
                className={`glass-card ${styles.card}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.iconWrap}>{item.icon}</span>
                  <span
                    className={`${styles.badge} ${
                      item.category === 'research'
                        ? styles.badgeResearch
                        : item.category === 'award'
                        ? styles.badgeAward
                        : ''
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className={styles.itemTitle}>{item.title}</h3>
                <div className={styles.itemIssuer}>
                  {item.issuerOrVenue} • {item.date}
                </div>
                <p className={styles.itemDesc}>{item.description}</p>

                {item.metrics && item.metrics.length > 0 && (
                  <div className={styles.metricsRow}>
                    {item.metrics.map((m) => (
                      <span key={m} className={styles.metricTag}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
