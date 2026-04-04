import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { SOCIAL } from '../../constants/social';

const footerLinks: { label: string; href: string }[] = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: SOCIAL.linkedin, label: 'LinkedIn' },
    { icon: <Github size={20} />, href: SOCIAL.github, label: 'GitHub' },
    { icon: <Twitter size={20} />, href: SOCIAL.x, label: 'X' },
  ];

  return (
    <footer className="bg-[#212428] pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 border-t border-black">
      <motion.button
        type="button"
        aria-label="Back to top"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1e2024] shadow-2xl flex items-center justify-center text-[#8b5cf6] border border-gray-800 hover:border-[#8b5cf6] transition-colors"
      >
        <ArrowUp size={22} className="sm:w-6 sm:h-6" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-8 mb-12 sm:mb-16 text-left">
          <div className="flex flex-col gap-4 sm:gap-6 items-start">
            {/* <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#ec1c24] flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shrink-0">
                F
              </div>
              <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">FUAD JEMAL</span>
            </div> */}
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              Building scalable, secure, and modern digital experiences with Django, MERN, and a passion for clean
              architecture.
            </p>
            <div className="flex gap-3 sm:gap-4 justify-start">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#1e2024] shadow-xl flex items-center justify-center text-gray-400 hover:text-[#8b5cf6] hover:-translate-y-1 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#8b5cf6] text-sm uppercase tracking-[2px] font-bold mb-6 sm:mb-8">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors relative group inline-block"
                  >
                    <span className="relative z-10">{label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#8b5cf6] transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-[#8b5cf6] text-sm uppercase tracking-[2px] font-bold mb-6 sm:mb-8">Get In Touch</h4>
            <div className="space-y-3 sm:space-y-4 text-gray-400 text-sm">
              <p className="flex items-start justify-start gap-3 min-w-0">
                <Mail size={16} className="text-[#8b5cf6] shrink-0 mt-0.5" />
                <a href="mailto:fuad.jemal.mail@gmail.com" className="break-all">
                  fuad.jemal.mail@gmail.com
                </a>
              </p>
              <p className="leading-relaxed">Addis Ababa, Ethiopia</p>
              <p className="mt-4 text-xs italic opacity-60">Available for freelance projects and technical collaborations.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 border-t border-gray-800/50 text-center px-0">
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            © {new Date().getFullYear()}. All rights reserved by{' '}
            <span className="text-[#8b5cf6] font-semibold">Fuad Jemal</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
