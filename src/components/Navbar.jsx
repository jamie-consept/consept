import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'play', label: 'Play' },
  { id: 'journal', label: 'Journal' },
  { id: 'about', label: 'About' },
];

export default function Navbar() {
  const [active, setActive] = useState('');

  // Track which section is in view to highlight the matching nav link
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 lg:px-16 pt-5 sm:pt-6"
    >
      <div className="frost rounded-full pl-5 pr-1.5 py-1.5 max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Logo lockup */}
        <a href="#top" className="flex items-center gap-2.5 shrink-0" aria-label="Consept home">
          <span className="w-2 h-2 rounded-full bg-moss" aria-hidden />
          <span className="font-serif italic text-xl text-ink leading-none translate-y-[1px]">
            consept
          </span>
        </a>

        {/* Center nav — desktop only */}
        <div className="hidden md:flex items-center gap-7 text-sm text-inksoft">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`link-underline transition-colors hover:text-ink ${
                active === item.id ? 'is-active text-ink' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="group flex items-center gap-2 bg-ink text-paper rounded-full pl-4 pr-1 py-1 text-sm shrink-0"
        >
          <span className="hidden sm:inline">Get in touch</span>
          <span className="sm:hidden">Contact</span>
          <span className="bg-moss rounded-full w-7 h-7 flex items-center justify-center transition-transform duration-500 ease-out group-hover:rotate-45">
            <ArrowUpRight size={14} className="text-paper" strokeWidth={1.75} />
          </span>
        </a>
      </div>
    </motion.nav>
  );
}
