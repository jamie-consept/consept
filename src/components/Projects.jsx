import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Placeholder project data — Jamie to swap for real entries
const PROJECTS = [
  {
    id: 1,
    title: 'Tideline Collective',
    type: 'Brand identity & website',
    year: '2025',
    desc: 'A coastal regeneration charity rebuilding salt-marsh habitats along the Northumberland coast.',
    tag: 'Identity',
    gradient: 'linear-gradient(135deg, #C8D5BB 0%, #6B8E5A 100%)',
  },
  {
    id: 2,
    title: 'Common Ground',
    type: 'Experience design',
    year: '2025',
    desc: 'An immersive installation for a community-owned land trust, co-created with residents over six months.',
    tag: 'Spatial',
    gradient: 'linear-gradient(135deg, #E8DCC4 0%, #B8956A 100%)',
  },
  {
    id: 3,
    title: 'Slowleaf',
    type: 'Product & packaging',
    year: '2024',
    desc: 'Compostable tea packaging for a single-origin loose-leaf company. Letterpressed, hand-tied.',
    tag: 'Physical',
    gradient: 'linear-gradient(135deg, #D4A373 0%, #8B5E3C 100%)',
  },
  {
    id: 4,
    title: 'The Mending Library',
    type: 'Digital platform',
    year: '2024',
    desc: 'A repair-and-share platform for a network of community workshops across the North East.',
    tag: 'Digital',
    gradient: 'linear-gradient(135deg, #B5C9B0 0%, #4A6B3F 100%)',
  },
];

// Distance each card "owns" in the scroll flow — taller spacer = longer pin
const DESKTOP_CARD_SPACER = 'md:h-[120vh]';

/**
 * StackingCard
 * Mobile: renders the original visual-on-top, meta-below layout.
 * Desktop: card is sticky at top:6rem inside a 120vh spacer so the next card
 * scrolls up and over it. Subtle scale/y shift on the pinned card as the next
 * one approaches gives the "deck of cards" feel.
 */
function StackingCard({ project, index, total }) {
  const wrapperRef = useRef(null);

  // Track scroll progress through this card's spacer. As the next card scrolls
  // in (the back-half of progress), shrink + lift this one slightly.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });

  // Only the back portion drives the shift — keeps the card fully natural while it's the "active" one.
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0, -16]);
  const isLast = index === total - 1;

  return (
    <div
      ref={wrapperRef}
      className={`relative ${isLast ? '' : DESKTOP_CARD_SPACER}`}
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          duration: 0.9,
          delay: 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        // On desktop: sticky pin. On mobile: normal flow.
        className="md:sticky md:top-24 group"
        style={{ scale, y }}
      >
        {/* MOBILE LAYOUT — original visual-on-top, meta-below. Hidden on md+. */}
        <a href="#" className="block md:hidden">
          <div
            className="relative aspect-[4/5] rounded-2xl overflow-hidden grain mb-6"
            style={{ background: project.gradient }}
          >
            <div className="absolute top-4 left-4 frost rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink z-10">
              {project.tag}
            </div>
            <div className="absolute bottom-4 right-4 w-11 h-11 frost rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 z-10">
              <ArrowUpRight size={16} className="text-ink" strokeWidth={1.75} />
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h3 className="font-display font-light text-2xl text-ink leading-tight">
              {project.title}
            </h3>
            <span className="text-xs text-inksoft tabular-nums shrink-0">
              {project.year}
            </span>
          </div>
          <p className="text-sm text-inksoft mb-3">{project.type}</p>
          <p className="text-sm text-inksoft leading-relaxed max-w-md text-pretty">
            {project.desc}
          </p>
        </a>

        {/* DESKTOP LAYOUT — visual left, meta right, 5:3 aspect. Hidden below md. */}
        <a
          href="#"
          className="hidden md:block bg-paper rounded-2xl overflow-hidden border border-line shadow-[0_24px_64px_-32px_rgba(26,31,26,0.18)]"
        >
          <div className="grid grid-cols-12 aspect-[5/3]">
            {/* Visual — left ~58% (7/12) */}
            <div
              className="relative col-span-7 grain overflow-hidden"
              style={{ background: project.gradient }}
            >
              <div className="absolute top-5 left-5 frost rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink z-10">
                {project.tag}
              </div>
            </div>

            {/* Meta — right ~42% (5/12) */}
            <div className="relative col-span-5 p-10 lg:p-12 flex flex-col justify-between">
              {/* Top row: index number, year */}
              <div className="flex items-start justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-inksoft tabular-nums">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <span className="text-xs text-inksoft tabular-nums">
                  {project.year}
                </span>
              </div>

              {/* Bottom block: title, type, description, arrow chip */}
              <div>
                <h3 className="font-display font-light text-4xl lg:text-5xl text-ink leading-[1.02] tracking-tight mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-inksoft mb-4">{project.type}</p>
                <p className="text-sm text-inksoft leading-relaxed max-w-sm text-pretty">
                  {project.desc}
                </p>

                <div className="flex justify-end -mt-6">
                  <div className="w-12 h-12 frost rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} className="text-ink" strokeWidth={1.75} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative px-6 md:px-12 lg:px-16 py-24 md:py-36"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-inksoft">
              01 &mdash; Projects
            </span>
            <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl mt-4 leading-[0.95] tracking-tighter text-ink">
              Selected <span className="italic text-moss">work</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm text-inksoft link-underline"
          >
            View all
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </div>

        {/* Cards.
            Mobile: simple vertical stack with gap.
            Desktop: each card lives in its own 120vh spacer so it pins, and the
            following card scrolls up and over it. */}
        <div className="space-y-10 md:space-y-0">
          {PROJECTS.map((p, i) => (
            <StackingCard
              key={p.id}
              project={p}
              index={i}
              total={PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
