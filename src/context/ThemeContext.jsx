import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

function applyTheme(theme) {
  let resolved = theme;
  if (theme === 'system') {
    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-eye');
  document.documentElement.classList.add(`theme-${resolved}`);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('aca-theme') || 'system';
    applyTheme(saved);
    return saved;
  });

  const [compact, setCompactState] = useState(() => {
    return localStorage.getItem('aca-compact') === 'true';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('aca-theme', newTheme);
    applyTheme(newTheme);
  };

  const setCompact = (val) => {
    setCompactState(val);
    localStorage.setItem('aca-compact', val);
    if (val) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
  };

  useEffect(() => {
    if (compact) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
  }, [compact]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, compact, setCompact }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
