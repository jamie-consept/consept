import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

/**
 * ThemeToggle
 *
 * Geometry (matched to the Shahi reference):
 *   - Pill:   64 x 32 (w-16 h-8), rounded-full
 *   - Inset:  4px all sides (p-1) → inner area 56 x 24
 *   - Thumb:  24 x 24 (w-6 h-6), sits at left-1 by default; animates to
 *             x:28 when dark, landing at right-1 with equal breathing room
 *   - Icons:  flex-1 halves, centred via justify-center inside each half
 *
 * Wired to useTheme — clicking toggles the `dark` class on <html>,
 * persists in localStorage, defaults to dark on first visit.
 */
export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className="relative inline-flex items-center w-16 h-8 rounded-full border border-line bg-paperdeep/70 hover:bg-paperdeep transition-colors p-1 shrink-0"
    >
      {/* Sliding thumb. left-1/top-1 gives a 4px inset on three sides at
          rest; animating x to 28 lands it with the same 4px inset on the
          right when in dark mode. */}
      <motion.span
        aria-hidden
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute left-1 top-1 w-6 h-6 rounded-full bg-ink"
      />

      {/* Icon row: two equal halves, icon centred in each. */}
      <span className="relative z-10 flex-1 flex items-center justify-center">
        <Sun
          size={13}
          strokeWidth={2}
          className={`transition-colors duration-300 ${
            isDark ? 'text-inksoft' : 'text-paper'
          }`}
        />
      </span>
      <span className="relative z-10 flex-1 flex items-center justify-center">
        <Moon
          size={13}
          strokeWidth={2}
          className={`transition-colors duration-300 ${
            isDark ? 'text-paper' : 'text-inksoft'
          }`}
        />
      </span>
    </button>
  );
}
