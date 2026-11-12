import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Theme = 'crimson' | 'mono' | 'cosmic';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  nextTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('vs_portfolio_theme');
      if (saved === 'crimson' || saved === 'mono' || saved === 'cosmic') {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'crimson'; // Default is the reimagined Red, White, Grey, Black theme
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem('vs_portfolio_theme', t);
    } catch {
      // Ignore
    }
  };

  const nextTheme = () => {
    const sequence: Theme[] = ['crimson', 'mono', 'cosmic'];
    const nextIdx = (sequence.indexOf(theme) + 1) % sequence.length;
    setTheme(sequence[nextIdx]);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('theme-crimson', 'theme-mono', 'theme-cosmic');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, nextTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

