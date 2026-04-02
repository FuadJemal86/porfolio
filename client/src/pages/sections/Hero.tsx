import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, Database, Globe } from 'lucide-react';
import fuadpp from '../image/fuadpp.jpg';

function ProfileRing({ className = '' }: { className?: string }) {
  return (
    <div className={`relative z-10 rounded-full border-[3px] sm:border-4 border-[#ff014f] p-2 sm:p-4 max-w-[min(88vw,420px)] ${className}`}>
      <div className="aspect-square w-[min(82vw,380px)] sm:w-[min(70vw,420px)] md:w-[min(45vw,420px)] max-w-full mx-auto rounded-full overflow-hidden">
        <img src={fuadpp} alt="Fuad Jemal" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export function Hero() {
  const phrases = useMemo(
    () => ['Full Stack Web Developer', 'Software Engineer', 'Problem Solver'],
    [],
  );

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingText = useMemo(() => {
    const phrase = phrases[phraseIndex] ?? '';
    return phrase.slice(0, charIndex);
  }, [charIndex, phraseIndex, phrases]);

  useEffect(() => {
    const phrase = phrases[phraseIndex] ?? '';
    const typingSpeed = 55;
    const deletingSpeed = 35;

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    // Pause after completing a phrase
    if (!isDeleting && charIndex === phrase.length) delay = 900;
    // Pause briefly after deletion
    if (isDeleting && charIndex === 0) delay = 350;

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-[4.5rem] sm:pt-20 pb-12 sm:pb-16 bg-[#212428] overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[3px] mb-3 sm:mb-4">
            Welcome to my world
          </p>

          {/* Mobile: photo directly under welcome line */}
          <div className="flex justify-center mb-8 lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProfileRing />
            </motion.div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-[1.15]">
            Hi, I&apos;m <span className="text-[#ff014f]">Fuad Jemal</span>
            <br />
            <span className="block mt-2 sm:mt-0 sm:inline sm:ml-0 text-2xl sm:text-4xl md:text-5xl leading-[1.2]">
              <span className="bg-gradient-to-r from-[#ff014f] via-[#ff014f] to-[#5eb3f6] bg-clip-text text-transparent font-semibold break-words">
                {typingText}
              </span>
              <span className="ml-1 text-[#ff014f] animate-pulse" aria-hidden="true">
                |
              </span>
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0">
            I build scalable web applications using{' '}
            <span className="text-white font-medium">Django, MERN Stack</span>, and modern web technologies.
            Focused on building efficient, secure, and real-world software solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-6 sm:mt-4 w-full sm:w-auto">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#1e2024] border border-white/10 text-[#ff014f] font-bold text-sm hover:border-[#ff014f] transition-colors w-full sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#ff014f] border border-[#ff014f] text-white font-bold text-sm hover:bg-[#d70043] transition-colors w-full sm:w-auto"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center sm:justify-items-start">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 sm:mb-4">
                Find with me
              </p>
              <div className="flex gap-3 sm:gap-4">
                {[<Github key="g" />, <Linkedin key="l" />, <Globe key="w" />].map((icon, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#1e2024] shadow-xl flex items-center justify-center text-white hover:text-[#ff014f] hover:-translate-y-1 transition-all"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 sm:mb-4">
                Best Skill on
              </p>
              <div className="flex gap-3 sm:gap-4">
                {[<Code2 key="c" />, <Database key="d" />, 'JS'].map((skill, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#1e2024] shadow-xl flex items-center justify-center text-[#ff014f] font-bold text-sm sm:text-base"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop: photo in right column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:flex justify-end"
        >
          <ProfileRing />
        </motion.div>
      </div>
    </section>
  );
}
