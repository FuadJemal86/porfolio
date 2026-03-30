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
            <span className="text-2xl sm:text-4xl md:text-5xl block mt-2 sm:mt-0 sm:inline sm:ml-0">
              a Full Stack Developer.
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0">
            I build scalable web applications using{' '}
            <span className="text-white font-medium">Django, MERN Stack</span>, and modern web technologies.
            Focused on building efficient, secure, and real-world software solutions.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-8 sm:gap-10">
            <div className="flex flex-col items-center lg:items-start">
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
            <div className="flex flex-col items-center lg:items-start">
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
