import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={closeMenu}
        />
      )}
      <div
        className={[
          'relative md:mx-auto md:mt-3 md:max-w-6xl md:px-1 lg:px-2',
          'md:rounded-2xl md:border md:overflow-hidden',
          'transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ease-out',
          scrolled
            ? 'md:bg-transparent md:backdrop-blur-md md:border-white/10 md:shadow-none'
            : 'md:bg-[#121415]/92 md:backdrop-blur-lg md:border-white/10 md:shadow-xl md:shadow-black/25',
        ].join(' ')}
      >
        <nav
          className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 bg-[#121415]/95 backdrop-blur-md border-b border-white/5 md:border-0 md:bg-transparent md:backdrop-blur-none"
        >
          <a href="#home" onClick={closeMenu} className="min-w-0 shrink">
            <span className="text-white font-bold text-lg sm:text-xl tracking-wide truncate">
              FUAD JEMAL
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-gray-400 hover:text-[#891989] text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#contact"
              onClick={closeMenu}
              className="hidden sm:inline-flex px-4 lg:px-6 py-2 rounded-md bg-[#1e2024] shadow-lg text-[#891989] text-xs sm:text-sm font-bold border border-transparent hover:border-[#891989] transition-all"
            >
              HIRE ME
            </a>

            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 rounded-lg text-white bg-[#1e2024] border border-white/10"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden absolute left-0 right-0 top-full z-[45] border-t border-white/10 bg-[#121415] shadow-2xl max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto">
            <ul className="px-4 py-4 flex flex-col gap-1">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="block py-3 px-3 rounded-lg text-gray-300 hover:text-[#891989] hover:bg-white/5 text-sm font-semibold uppercase tracking-widest transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-3 border-t border-white/10 mt-2">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block text-center py-3 rounded-md bg-[#1e2024] text-[#891989] text-sm font-bold border border-transparent"
                >
                  HIRE ME
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
