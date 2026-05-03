import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 lg:px-16 py-24 md:py-36 bg-paperdeep/40"
    >
      <div className="max-w-7xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.22em] text-inksoft">
          04 &mdash; About
        </span>

        <div className="grid md:grid-cols-12 gap-12 mt-8">
          {/* Manifesto */}
          <div className="md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink text-balance"
            >
              Consept is a small studio working at the intersection of{' '}
              <span className="italic text-moss">design</span>,{' '}
              <span className="italic text-moss">conscience</span> and{' '}
              <span className="italic text-moss">craft</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-12 space-y-6 text-base md:text-lg text-inksoft leading-relaxed max-w-xl text-pretty"
            >
              <p>
                We work across brand, product and experience &mdash; for
                charities, climate-focused founders, cultural institutions and
                businesses trying to do the right thing without being precious
                about it.
              </p>
              <p>
                We use AI in our process where it earns its place. We do not let
                it speak for us, design for us, or replace the slow thinking
                that good work needs.
              </p>
              <p>
                We believe design should serve people, places and the long
                future &mdash; not just the next quarter.
              </p>
            </motion.div>
          </div>

          {/* Side card — founder */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="md:col-span-4 md:pl-8 md:border-l md:border-line"
          >
            <div className="text-[11px] uppercase tracking-[0.22em] text-inksoft mb-5">
              Founder
            </div>
            <div className="font-display font-light text-2xl md:text-3xl text-ink leading-tight">
              Jamie Lewis
            </div>
            <div className="text-sm text-inksoft mt-1 mb-6">
              Creative Director
            </div>
            <p className="text-sm text-inksoft leading-relaxed text-pretty">
              Jamie is a design generalist with a decade of experience across
              brand, digital and spatial work. He founded Consept to focus on
              the kind of projects he wanted to spend his time on &mdash; ones
              with purpose, care, and the patience to be made well.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-y-5 text-sm">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-inksoft mb-1">
                  Based
                </div>
                <div className="text-ink">North East England</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-inksoft mb-1">
                  Working
                </div>
                <div className="text-ink">Worldwide</div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
