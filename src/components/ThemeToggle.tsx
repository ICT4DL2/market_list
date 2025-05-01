import { useTheme } from '../useTheme';
import { Sun, Moon } from 'lucide-react'; // ou tout autre icône

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: 'var(--color-primary)'
      }}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
};
