'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExperienceSection.module.css';

interface ExperienceItem {
  id: string;
  category: 'internship' | 'leadership';
  role: string;
  organization: string;
  period: string;
  location: string;
  badge: string;
  highlights: string[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'dg-interns-hub',
    category: 'internship',
    role: 'Cybersecurity Intern',
    organization: 'DG Interns Hub',
    period: 'Aug 2026 – Present',
    location: 'Remote',
    badge: 'Active Internship',
    highlights: [
      'Analysed network traffic with Wireshark deep packet capture, dissecting DNS resolution, TCP handshakes, and TLS 1.3 sessions across 1,400+ packets.',
      'Performed reconnaissance and service enumeration via Nmap, fingerprinting operating systems and vulnerable legacy services on live endpoints.',
      'Modeled Layer 2/3 attack vectors (ARP poisoning, TCP SYN flood DoS) and engineered defensive controls including Dynamic ARP Inspection (DAI) and 802.1X.',
    ],
    tags: ['Wireshark', 'Nmap', 'Deep Packet Capture', 'TLS 1.3', 'DAI', '802.1X'],
  },
  {
    id: 'flyrank',
    category: 'internship',
    role: 'AI Fluency Intern',
    organization: 'FlyRank Corp. (FlyRank.ai)',
    period: 'Jul 2026 – Sep 2026',
    location: 'Remote',
    badge: 'AI Security',
    highlights: [
      'Developed and evaluated agentic AI workflows, LLM prompt architectures, and autonomous reasoning pipelines.',
      'Designed benchmark suites and safety evaluations testing generative AI systems against hallucination, prompt injection, and output drift.',
    ],
    tags: ['Agentic AI', 'Prompt Engineering', 'LLM Red Teaming', 'Safety Benchmarking', 'Drift Analysis'],
  },
  {
    id: 'virtual-works-lab',
    category: 'internship',
    role: 'Cybersecurity Intern',
    organization: 'Virtual Works Lab (by Emogi)',
    period: 'May 2026 – Jun 2026',
    location: 'Remote',
    badge: 'Tool Dev & ML',
    highlights: [
      'Built BruteShield, a login-attempt control system enforcing progressive account lockout and real-time suspicious-IP flagging to block credential-stuffing attacks.',
      'Hardened file security with an obfuscation/access-control utility using layered XOR encryption and role-based permissions across 3+ asset categories.',
      'Shipped a multi-threaded port scanner covering a full Class-C subnet in under 30 seconds, cutting manual recon time by 70%.',
      'Trained an NLP email-threat classifier (Random Forest + TF-IDF) on 10,000+ samples across 5 attack categories, achieving 92%+ precision.',
    ],
    tags: ['Python', 'BruteShield', 'Layered XOR', 'NLP', 'Scikit-Learn', 'Port Scanner'],
  },
  {
    id: 'thiranex',
    category: 'internship',
    role: 'Cybersecurity Intern',
    organization: 'Thiranex',
    period: 'Apr 2026 – May 2026',
    location: 'Hybrid',
    badge: 'Automation & IR',
    highlights: [
      'Authored 3+ Python security automation scripts replicating real-world attacks (credential spraying, privilege escalation, port exploitation), cutting manual detection effort by 40%.',
      'Prototyped a log-analysis security agent correlating events across 5+ log sources to reduce mean-time-to-detect for critical anomalies.',
    ],
    tags: ['Python', 'Attack Simulation', 'Privilege Escalation', 'Log Correlation', 'Incident Response'],
  },
  {
    id: 'vetri-technologies',
    category: 'internship',
    role: 'Cybersecurity Analyst Intern',
    organization: 'Vetri Technologies',
    period: 'Dec 2025 – Jan 2026',
    location: 'Onsite',
    badge: 'SOC & SIEM',
    highlights: [
      'Reviewed 100+ MB of daily network traffic and system logs via Wireshark and Splunk SIEM, identifying 3+ anomalies per week for escalation.',
      'Triaged 50+ security alerts per shift, achieving over 60% false-positive suppression, and reverse-engineered attacker techniques into 5+ new SIEM detection rules.',
    ],
    tags: ['Splunk SIEM', 'Wireshark', 'Alert Triage', 'Detection Engineering', 'Traffic Analysis'],
  },
  {
    id: 'defcon-trichy',
    category: 'leadership',
    role: 'Primary Organizer',
    organization: 'DEF CON Group Tiruchirappalli (DC0431 / DCG91431)',
    period: 'Aug 2026 – Present',
    location: 'Tiruchirappalli',
    badge: 'Community Founder',
    highlights: [
      'Founded and registered the official DEF CON Group in Trichy, organizing workshops in network security, packet analysis, and CTF competitions.',
      'Fostered a collaborative community for ethical hackers, students, and cybersecurity researchers across the region.',
    ],
    tags: ['DEF CON', 'DC0431', 'Community Leadership', 'CTF Competitions', 'Network Security'],
  },
  {
    id: 'google-ambassador',
    category: 'leadership',
    role: 'Google Campus Ambassador',
    organization: 'Dhanalakshmi Srinivasan University',
    period: 'May 2026 – Present',
    location: 'Trichy',
    badge: 'Ambassador',
    highlights: [
      'Represent Google developer technologies and AI tools across campus, conducting student workshops and developer sessions.',
      'Evangelize hands-on generative AI, developer ecosystems, and cloud technologies to 300+ students.',
    ],
    tags: ['Google', 'Campus Ambassador', 'Developer Relations', 'AI Workshops'],
  },
  {
    id: 'nexus-26',
    category: 'leadership',
    role: 'Event Organizer & Lead Judge',
    organization: "NEXUS '26 National Technical Fest",
    period: 'Feb 2026',
    location: 'Trichy',
    badge: 'Lead Judge',
    highlights: [
      'Directed a 200+ attendee national technical symposium, coordinating 15+ team members across 6 event tracks; grew participation 35% year-over-year.',
      'Judged 10+ teams in Startup Pitch and hackathon finals using structured scoring rubrics.',
    ],
    tags: ['National Symposium', 'Hackathon Judge', '200+ Attendees', 'Track Leadership'],
  },
  {
    id: 'cyber-aura-25',
    category: 'leadership',
    role: 'Lead Coordinator',
    organization: "Cyber Aura '25",
    period: '2025',
    location: 'Trichy',
    badge: 'Lead Coordinator',
    highlights: [
      'Led a 100+ attendee cybersecurity awareness event with 4 CTF challenges and 2 expert sessions, coordinating 3 sub-teams for a zero-incident event.',
    ],
    tags: ['CTF Operations', 'Awareness Campaign', 'Team Coordination'],
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

export default function ExperienceSection() {
  const [filter, setFilter] = useState<'all' | 'internship' | 'leadership'>('all');

  const filtered = experiences.filter((e) =>
    filter === 'all' ? true : e.category === filter
  );

  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className={styles.inner}>
        <span className="section-label">Track Record</span>
        <h2 style={{ marginBottom: 'var(--space-md)' }}>
          Experience &amp; <span className="grad-text">Leadership</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', maxWidth: '640px' }}>
          Five hands-on industry internships in SOC operations, AI security, blue teaming, and security automation — paired with community leadership founding DEF CON Group Trichy.
        </p>

        <div className={styles.filters}>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All Experience ({experiences.length})
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'internship' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('internship')}
          >
            Internships (5)
          </button>
          <button
            type="button"
            className={`${styles.filterBtn} ${filter === 'leadership' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('leadership')}
          >
            Leadership &amp; Community (4)
          </button>
        </div>

        <div className={styles.timeline}>
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, i) => (
              <motion.div
                key={exp.id}
                layout
                custom={i}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                variants={cardVariants}
                className={`glass-card ${styles.card}`}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.roleTitle}>{exp.role}</h3>
                    <div className={styles.companyRow}>
                      <span className={styles.company}>{exp.organization}</span>
                      <span className={styles.period}>• {exp.location} | {exp.period}</span>
                    </div>
                  </div>
                  <span
                    className={`${styles.badge} ${
                      exp.category === 'leadership' ? styles.leadershipBadge : ''
                    }`}
                  >
                    {exp.badge}
                  </span>
                </div>

                <ul className={styles.bulletList}>
                  {exp.highlights.map((h, idx) => (
                    <li key={idx} className={styles.bulletItem}>
                      <span className={`glow-dot ${styles.bulletDot}`} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {exp.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
