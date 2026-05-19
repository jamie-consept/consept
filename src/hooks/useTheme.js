import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'consept-theme';
const DEFAULT_THEME = 'dark'; // Studio default — site loads in dark mode as a statement

/**
 * useTheme — manages light/dark theme.
 *
 * - First load: reads localStorage. If absent, uses DEFAULT_THEME.
 * - Toggling: flips the `dark` class on <html>, persists to localStorage.
 * - SSR-safe: the `dark` class is set synchronously by the pre-paint script
 *   in index.html before React hydrates, so there's no flash-of-wrong-theme.
 *   This hook just keeps React state in sync.
 */
export function useTheme() {
  // Read the initial theme from the <html> class, which the pre-paint script
  // has already set. This avoids a hydration mismatch.
  const [theme, setThemeState] = useState(() => {
    if (typeof document === 'undefined') return DEFAULT_THEME;
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  const setTheme = useCallback((next) => {
    setThemeState(next);
    if (typeof document === 'undefined') return;
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage may be disabled — non-fatal */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // If something else (e.g. another tab) changes the stored theme, react.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [setTheme]);

  return { theme, setTheme, toggle, isDark: theme === 'dark' };
}
