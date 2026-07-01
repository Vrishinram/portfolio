'use client';

import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const socials = [
  { label: 'GitHub', href: 'https://github.com/Vrishinram', icon: '↗' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/vrishin-ram-k', icon: '↗' },
  { label: 'Email', href: 'mailto:vrishinram4646@gmail.com', icon: '✉' },
];

export default function ContactSection() {
  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={styles.inner}
      >
        <motion.span className="section-label" variants={fadeUp}>
          Get In Touch
        </motion.span>

        <motion.h2 variants={fadeUp}>
          Let&apos;s build something<br />
          <span className="grad-text">extraordinary</span>
        </motion.h2>

        <motion.p variants={fadeUp} className={styles.desc}>
          I&apos;m actively seeking cybersecurity analyst roles and excited to
          collaborate on innovative projects in security, AI, and web development.
          Let&apos;s connect and make it happen.
        </motion.p>

        <motion.div variants={fadeUp} className={styles.links}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card ${styles.socialCard}`}
            >
              <span className={styles.socialLabel}>{s.label}</span>
              <span className={styles.socialIcon}>{s.icon}</span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer variants={fadeUp} className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Vrishin Ram K — Crafted with{' '}
          <span className="grad-text">passion</span> &amp; Next.js
        </p>
      </motion.footer>
    </section>
  );
}
