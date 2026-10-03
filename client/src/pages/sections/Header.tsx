import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../../components/ThemeToggle';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b">
      <nav className="page-wrap h-14 sm:h-16 flex items-center justify-between gap-4">
        <a
          href="#home"
          onClick={close}
          className="font-heading text-[15px] sm:text-base tracking-tight text-[color:var(--text-color)] shrink-0"
        >
          fuad<span className="text-[color:var(--button-bg)]">.</span>dev
        </a>

        <ul className="hidden sm:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)] hover:text-[color:var(--text-color)] transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[color:var(--border-color)] text-[color:var(--text-color)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="sm:hidden border-t border-[color:var(--border-color)] bg-[color:var(--section-bg)]"
        >
          <ul className="page-wrap py-3 flex flex-col">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={close}
                  className="block py-3 font-mono-ui text-xs uppercase tracking-[0.16em] text-[color:var(--muted)] hover:text-[color:var(--text-color)]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
