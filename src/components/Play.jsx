import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ITEMS = [
  {
    title: 'Foraged Type',
    desc: 'A typeface drawn from hedgerow specimens',
    year: '2025',
    state: 'In progress',
  },
  {
    title: 'Weather Sketches',
    desc: 'Daily generative drawings, one per day, all year',
    year: '2025',
    state: 'Ongoing',
  },
  {
    title: 'Slow Web',
    desc: 'An experiment in pages that load like letters arrive',
    year: '2024',
    state: 'Released',
  },
  {
    title: 'Compost Diary',
    desc: 'A weekly photo journal of a back-garden compost heap',
    year: '2024',
    state: 'Ongoing',
  },
];

export default function Play() {
  return (
    <section
      id="play"
      className="relative px-6 md:px-12 lg:px-16 py-24 md:py-36 bg-paperdeep/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.22em] text-inksoft">
            02 &mdash; Play
          </span>
          <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl mt-4 leading-[0.95] tracking-tighter text-ink">
            Things we are <span className="italic text-moss">tinkering with</span>
          </h2>
          <p className="text-inksoft mt-7 text-base md:text-lg max-w-xl text-pretty">
            Side projects, sketches, half-finished ideas. Most will not become
            anything. A few might.
          </p>
        </div>

        {/* Tile grid — rougher feel, no images, just generous space and metadata */}
        <div className="grid md:grid-cols-2 gap-px bg-line rounded-2xl overflow-hidden border border-line">
          {ITEMS.map((item, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group bg-paper p-8 md:p-10 hover:bg-paperdeep transition-colors duration-500 block"
            >
              <div className="flex items-start justify-between mb-12">
                <span className="text-[11px] tracking-wider text-inksoft tabular-nums uppercase">
                  {String(i + 1).padStart(2, '0')} / {item.year} / {item.state}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="text-inksoft transition-all duration-500 group-hover:rotate-45 group-hover:text-moss"
                />
              </div>
              <h3 className="font-display font-light text-2xl md:text-3xl text-ink mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-inksoft text-pretty">{item.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
