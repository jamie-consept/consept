import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

/**
 * ThemeToggle
 *
 * Geometry rationale:
 *   - Pill:   64x32 (w-16 h-8). Padding p-1 (4px) is for visual breathing
 *             room only — the icons and thumb are positioned absolutely
 *             so the padding doesn't affect their layout.
 *   - Thumb:  24x24, sits at (left-1, top-1) at rest (sun-side) and
 *             animates x:28 to (right-1, top-1) for the moon-side.
 *             Thumb centres: (16, 16) and (44, 16).
 *   - Icons:  Each in a 24x24 absolute container placed exactly where the
 *             thumb sits at one end. Sun container at left-1 (centred at
 *             x=16), Moon container at left-8 (= 32px, centred at x=44).
 *             This guarantees each icon sits dead-centre on its thumb
 *             position. The previous flex-1 layout centred icons on the
 *             pill's *padded inner area*, which was offset from the thumb
 *             positions by a few pixels and read as off-centre.
 *
 * Wired to useTheme — toggling flips the `dark` class on <html>, persists
 * in localStorage, defaults to dark on first visit.
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
      className="relative inline-flex items-center w-16 h-8 rounded-full border border-line bg-paperdeep/70 hover:bg-paperdeep transition-colors shrink-0"
    >
      {/* Sliding thumb. left-1/top-1 → (4,4). Inner edges at x=28 (rest)
          and x=52 (right). Animating x:28 lands the thumb's centre at
          x=44, matching the moon icon container. */}
      <motion.span
        aria-hidden
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute left-1 top-1 w-6 h-6 rounded-full bg-ink"
      />

      {/* Sun — left absolute container, dead-centre on thumb's rest position */}
      <span className="absolute left-1 top-1 w-6 h-6 z-10 flex items-center justify-center pointer-events-none">
        <Sun
          size={13}
          strokeWidth={2}
          className={`transition-colors duration-300 ${
            isDark ? 'text-inksoft' : 'text-paper'
          }`}
        />
      </span>

      {/* Moon — right absolute container, dead-centre on thumb's animated-end position */}
      <span className="absolute left-8 top-1 w-6 h-6 z-10 flex items-center justify-center pointer-events-none">
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
