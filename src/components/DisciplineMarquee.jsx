const ITEMS = [
  'Brand identity',
  'Digital products',
  'Spatial & experience',
  'Print & editorial',
  'Slow research',
  'Packaging',
];

export default function DisciplineMarquee() {
  // Duplicate the list so the marquee loop is seamless
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Disciplines"
      className="relative border-y border-line py-7 overflow-hidden"
    >
      <div className="marquee-track whitespace-nowrap font-serif italic text-2xl md:text-3xl text-inksoft">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center pr-12">
            <span>{item}</span>
            <span className="text-moss ml-12" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
