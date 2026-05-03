import { ArrowUpRight } from 'lucide-react';

/**
 * CTA button with the Phase 2 sliding-fill hover.
 *
 * On hover:
 *  - A solid ink (or moss) panel slides in from the right, filling left
 *  - Text colour flips to paper
 *  - Arrow icon rotates 45° (matches navbar treatment)
 *
 * Variants:
 *   variant="ink"    → paper bg, ink fill on hover            (light contexts)
 *   variant="moss"   → ink bg, moss fill on hover, paper text (dark CTA pill, like nav)
 *   variant="paper"  → ink bg, paper fill on hover, ink text  (used on dark sections)
 */
export default function CTAButton({
  href = '#',
  children,
  variant = 'ink',
  size = 'md',
  className = '',
  onClick,
}) {
  const sizes = {
    sm: 'text-sm px-5 py-2.5',
    md: 'text-base px-6 py-3',
    lg: 'text-base md:text-lg px-7 py-4',
  };

  const variants = {
    ink: {
      base: 'border border-ink text-ink',
      fill: 'bg-ink',
      hoverText: 'group-hover:text-paper',
      iconBgIdle: 'bg-ink',
      iconColorIdle: 'text-paper',
      iconBgHover: 'group-hover:bg-paper',
      iconColorHover: 'group-hover:text-ink',
    },
    moss: {
      base: 'bg-ink text-paper',
      fill: 'bg-moss',
      hoverText: 'group-hover:text-paper',
      iconBgIdle: 'bg-moss',
      iconColorIdle: 'text-paper',
      iconBgHover: 'group-hover:bg-ink',
      iconColorHover: 'group-hover:text-paper',
    },
    paper: {
      base: 'bg-ink text-paper border border-ink',
      fill: 'bg-paper',
      hoverText: 'group-hover:text-ink',
      iconBgIdle: 'bg-paper',
      iconColorIdle: 'text-ink',
      iconBgHover: 'group-hover:bg-ink',
      iconColorHover: 'group-hover:text-paper',
    },
  };

  const v = variants[variant];

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 rounded-full overflow-hidden transition-colors duration-500 ease-out ${v.base} ${sizes[size]} ${className}`}
    >
      {/* Sliding fill: starts off-screen right, slides in to cover */}
      <span
        aria-hidden
        className={`absolute inset-0 ${v.fill} translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]`}
      />

      {/* Label */}
      <span className={`relative z-10 transition-colors duration-500 ${v.hoverText}`}>
        {children}
      </span>

      {/* Arrow chip — rotates on hover, swaps colours alongside the fill */}
      <span
        className={`relative z-10 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-500 ease-out group-hover:rotate-45 ${v.iconBgIdle} ${v.iconBgHover}`}
      >
        <ArrowUpRight
          size={14}
          strokeWidth={1.75}
          className={`transition-colors duration-500 ${v.iconColorIdle} ${v.iconColorHover}`}
        />
      </span>
    </a>
  );
}
