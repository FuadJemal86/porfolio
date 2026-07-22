import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'backdrop-blur border-[color:var(--line)]' : 'bg-transparent border-transparent',
      ].join(' ')}
      style={scrolled ? { backgroundColor: 'var(--bg)', opacity: 0.97 } : undefined}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#home" onClick={closeMenu} className="shrink-0 group">
          <span className="font-heading text-base tracking-tight text-[color:var(--ink)]">
            fuad<span style={{ color: 'var(--accent)' }}>.</span>dev
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-mono-ui text-[11px] uppercase tracking-[0.15em] text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={closeMenu}
            className="hidden sm:inline-flex items-center gap-1 font-mono-ui text-[11px] uppercase tracking-[0.15em] border border-[color:var(--line)] rounded-full px-4 py-2 text-[color:var(--ink)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
          >
            Let&apos;s talk <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 rounded-md border border-[color:var(--line)] text-[color:var(--ink)]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[color:var(--line)]"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <ul className="px-5 py-3 flex flex-col">
              {links.map(({ label, href }) => (
                <li key={label} className="border-b border-[color:var(--line)] last:border-none">
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="block py-3 font-mono-ui text-xs uppercase tracking-[0.15em] text-[color:var(--muted)] hover:text-[color:var(--ink)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}