import { motion } from 'framer-motion';
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

        {/* Asymmetric grid — even cards offset down for editorial rhythm */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group ${i % 2 === 1 ? 'md:translate-y-20' : ''}`}
            >
              <a href="#" className="block">
                {/* Visual */}
                <div
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden grain mb-6"
                  style={{ background: p.gradient }}
                >
                  <div className="absolute top-4 left-4 frost rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink z-10">
                    {p.tag}
                  </div>
                  <div className="absolute bottom-4 right-4 w-11 h-11 frost rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 z-10">
                    <ArrowUpRight size={16} className="text-ink" strokeWidth={1.75} />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display font-light text-2xl md:text-3xl text-ink leading-tight">
                    {p.title}
                  </h3>
                  <span className="text-xs text-inksoft tabular-nums shrink-0">
                    {p.year}
                  </span>
                </div>
                <p className="text-sm text-inksoft mb-3">{p.type}</p>
                <p className="text-sm text-inksoft leading-relaxed max-w-md text-pretty">
                  {p.desc}
                </p>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
