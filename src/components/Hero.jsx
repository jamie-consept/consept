import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HEADING_LINE_1 = ['Design', 'for', 'things'];
const HEADING_LINE_2 = ['that', 'ought'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-20 md:pb-28 pt-36 md:pt-44"
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="flex items-center gap-3 mb-10 md:mb-14"
      >
        <div className="w-10 h-px bg-inksoft/60" />
        <span className="text-[11px] uppercase tracking-[0.22em] text-inksoft">
          Studio · North East England · Est. 2024
        </span>
      </motion.div>

      {/* Display heading — large, tight, editorial */}
      <h1 className="font-serif text-[15vw] sm:text-[13vw] md:text-[10.5vw] lg:text-[9rem] leading-[0.92] tracking-tighter text-ink max-w-6xl text-balance">
        {HEADING_LINE_1.map((word, i) => (
          <motion.span
            key={`l1-${i}`}
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.9,
              delay: 0.25 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.22em]"
          >
            {word}
          </motion.span>
        ))}
        <br />
        {HEADING_LINE_2.map((word, i) => (
          <motion.span
            key={`l2-${i}`}
            initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.9,
              delay: 0.5 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.22em]"
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block italic text-moss"
        >
          to last.
        </motion.span>
      </h1>

      {/* Sub copy — pushed right, asymmetric */}
      <div className="grid md:grid-cols-12 gap-8 mt-14 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="md:col-span-5 md:col-start-7"
        >
          <p className="text-base md:text-lg text-inksoft leading-relaxed max-w-md text-pretty">
            We are a small design studio working with purpose-led businesses,
            charities and projects building toward a more sustainable, conscious
            future. Brand, product, and experience &mdash; physical and digital.
          </p>
          <a
            href="#projects"
            className="mt-7 inline-flex items-center gap-2 text-sm text-ink link-underline group"
          >
            See selected work
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
