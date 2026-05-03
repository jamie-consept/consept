import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const POSTS = [
  {
    title: 'On working with charities, honestly',
    excerpt:
      'What clients with no budget have taught us about clarity, scope, and the actual point of design.',
    date: 'Apr 2026',
    readTime: '6 min',
  },
  {
    title: 'AI tools, but quietly',
    excerpt:
      'We use them every day. Here is how we keep the work feeling human.',
    date: 'Mar 2026',
    readTime: '4 min',
  },
  {
    title: 'A field guide to good briefs',
    excerpt: 'The questions we ask before we draw a single line.',
    date: 'Feb 2026',
    readTime: '8 min',
  },
];

export default function Journal() {
  return (
    <section
      id="journal"
      className="relative px-6 md:px-12 lg:px-16 py-24 md:py-36"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-inksoft">
              03 &mdash; Journal
            </span>
            <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl mt-4 leading-[0.95] tracking-tighter text-ink">
              Notes from <span className="italic text-moss">the studio</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 text-sm text-inksoft link-underline"
          >
            All entries
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </div>

        {/* Row list — wide hover hit area, hairline dividers */}
        <div>
          <div className="border-t border-line" />
          {POSTS.map((post, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group block py-8 md:py-10 border-b border-line transition-colors duration-300 hover:bg-paperdeep/40 -mx-6 px-6 md:-mx-12 md:px-12"
            >
              <div className="grid md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-2 text-[11px] uppercase tracking-wider text-inksoft">
                  {post.date}
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display font-light text-2xl md:text-4xl text-ink leading-tight transition-colors duration-300 group-hover:text-moss">
                    {post.title}
                  </h3>
                  <p className="text-sm text-inksoft mt-3 max-w-xl text-pretty">
                    {post.excerpt}
                  </p>
                </div>
                <div className="md:col-span-2 text-xs text-inksoft tabular-nums">
                  {post.readTime}
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="text-inksoft transition-all duration-500 group-hover:rotate-45 group-hover:text-moss"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
