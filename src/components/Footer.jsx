import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative px-6 md:px-12 lg:px-16 pt-24 md:pt-36 pb-10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[11px] uppercase tracking-[0.22em] text-inksoft">
            05 &mdash; Get in touch
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl mt-4 leading-[0.92] tracking-tighter text-ink max-w-5xl text-balance">
            Have something <span className="italic text-moss">worth making?</span>
          </h2>
          <p className="text-inksoft mt-8 text-base md:text-lg max-w-xl text-pretty">
            We take on a small number of projects each year. If you are working
            on something good, we would love to hear about it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="mailto:hello@consept.io"
              className="group inline-flex items-center gap-3 bg-ink text-paper rounded-full pl-6 pr-1.5 py-1.5 text-base"
            >
              hello@consept.io
              <span className="bg-moss rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={16} className="text-paper" strokeWidth={1.75} />
              </span>
            </a>
            <a
              href="#"
              className="text-sm text-inksoft link-underline ml-2"
            >
              Or book a call
            </a>
          </div>
        </motion.div>

        {/* Foot bar */}
        <div className="mt-24 md:mt-36 pt-8 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-inksoft">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-moss" aria-hidden />
            <span>
              Consept &copy; {new Date().getFullYear()} &middot; Made slowly in
              the North East
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="link-underline hover:text-ink">
              Instagram
            </a>
            <a href="#" className="link-underline hover:text-ink">
              Are.na
            </a>
            <a href="#" className="link-underline hover:text-ink">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
