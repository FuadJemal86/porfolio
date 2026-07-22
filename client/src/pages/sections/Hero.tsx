import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUpRight, ArrowDown } from 'lucide-react';
import fuadpp from '../image/fuadpp.jpg';
import { SOCIAL } from '../../constants/social';

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-[color:var(--line)] flex items-center justify-center text-[color:var(--muted)] hover:text-[#0a0a0a] hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
    >
      {icon}
    </a>
  );
}

function useTypewriter(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const text = useMemo(() => (phrases[phraseIndex] ?? '').slice(0, charIndex), [charIndex, phraseIndex, phrases]);

  useEffect(() => {
    const phrase = phrases[phraseIndex] ?? '';
    const typingSpeed = 55;
    const deletingSpeed = 30;
    let delay = isDeleting ? deletingSpeed : typingSpeed;
    if (!isDeleting && charIndex === phrase.length) delay = 1800;
    if (isDeleting && charIndex === 0) delay = 400;

    const t = window.setTimeout(() => {
      if (!isDeleting && charIndex === phrase.length) {
        setIsDeleting(true);
        return;
      }
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        return;
      }
      setCharIndex((i) => i + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(t);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return text;
}

export function Hero() {
  const phrases = useMemo(
    () => ['Full Stack Developer', 'Software Engineer', 'ERP Builder', 'Problem Solver'],
    [],
  );
  const typingText = useTypewriter(phrases);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-5 sm:px-8"
    >
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 0%, black, transparent 75%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 sm:gap-5 mb-10 sm:mb-14"
        >
          <img
            src={fuadpp}
            alt="Fuad Jemal"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover grayscale border-2 sm:border-[3px] border-[color:var(--line)]"
          />
          <div>
            <p className="font-mono-ui text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Addis Ababa, Ethiopia — available for work
            </p>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          I&apos;m Fuad,
          <br />
          <span style={{ color: 'var(--accent)' }}>{typingText}</span>
          <motion.span
            className="inline-block w-[3px] h-[0.85em] ml-1 align-middle"
            style={{ background: 'var(--accent)' }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[color:var(--muted)] text-base sm:text-lg leading-relaxed max-w-xl mb-10"
        >
          I build scalable, secure, real-world systems — ERPs, management platforms and
          web apps — with Django, the MERN stack, and a habit of shipping fast without
          cutting corners.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-12 sm:mb-16"
        >
          <a
            href="#portfolio"
            className="font-heading inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#0a0a0a] bg-[color:var(--accent)] hover:opacity-90 transition-opacity"
          >
            View my work <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="font-heading inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold border border-[color:var(--line)] text-[color:var(--ink)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
          >
            Let&apos;s talk
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <SocialLink href={SOCIAL.github} label="GitHub" icon={<Github className="w-4 h-4" />} />
          <SocialLink href={SOCIAL.linkedin} label="LinkedIn" icon={<Linkedin className="w-4 h-4" />} />
          <SocialLink href={SOCIAL.x} label="X" icon={<Twitter className="w-4 h-4" />} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="relative mx-auto mt-16 sm:mt-20 flex flex-col items-center gap-2 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
}