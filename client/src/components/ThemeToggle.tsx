import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={['icon-btn', className].filter(Boolean).join(' ')}
    >
      {isDark ? <Sun className="w-3.5 h-3.5" aria-hidden /> : <Moon className="w-3.5 h-3.5" aria-hidden />}
    </button>
  );
}
