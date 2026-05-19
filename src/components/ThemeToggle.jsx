import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle
 *
 * Pill-shaped toggle with sun + moon icons on each side and a sliding ink
 * thumb that snaps between them on click. Light/Dark labels are read by
 * screen readers via aria-label, while sighted users see the position of
 * the thumb behind the icons.
 *
 * NOTE: This commit is UI-only. The toggle tracks its own internal state
 * but does NOT yet flip site theme. The dark palette rollout lands in the
 * next commit; this one ships the toggle in light-locked mode so we can
 * confirm physical design first.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setIsDark((v) => !v)}
      className="relative inline-flex items-center w-[56px] h-7 rounded-full border border-line bg-paperdeep/70 hover:bg-paperdeep transition-colors p-0.5 shrink-0"
    >
      {/* Sliding thumb — animates between left (light) and right (dark) */}
      <motion.span
        aria-hidden
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={`absolute top-0.5 ${isDark ? 'right-0.5' : 'left-0.5'} w-6 h-6 rounded-full bg-ink`}
      />

      {/* Icons — sit on top of the thumb. Whichever side the thumb is on
          flips icon colour to paper for contrast. */}
      <span className="relative z-10 flex items-center justify-center w-6 h-6">
        <Sun
          size={13}
          strokeWidth={2}
          className={isDark ? 'text-inksoft' : 'text-paper'}
        />
      </span>
      <span className="relative z-10 flex items-center justify-center w-6 h-6 ml-auto">
        <Moon
          size={13}
          strokeWidth={2}
          className={isDark ? 'text-paper' : 'text-inksoft'}
        />
      </span>
    </button>
  );
}
