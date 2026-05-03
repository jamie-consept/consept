import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import CTAButton from './CTAButton.jsx';

const HEADING_WORDS = ['Design', 'for', 'things', 'that', 'ought'];

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const fadeFrameRef = useRef(null);
  const fadingOutRef = useRef(false);

  // Subtle parallax/fade as the user scrolls past the hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // rAF crossfade loop — same Phase 2 pattern.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const animateOpacity = (from, to, duration, onComplete) => {
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = from + (to - from) * progress;
        if (videoRef.current) videoRef.current.style.opacity = String(value);
        if (progress < 1) {
          fadeFrameRef.current = requestAnimationFrame(step);
        } else if (onComplete) {
          onComplete();
        }
      };
      fadeFrameRef.current = requestAnimationFrame(step);
    };

    const handleCanPlay = () => animateOpacity(0, 1, 500);

    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      const remaining = videoRef.current.duration - videoRef.current.currentTime;
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        animateOpacity(1, 0, 250);
      }
    };

    const handleEnded = () => {
      if (!videoRef.current) return;
      videoRef.current.style.opacity = '0';
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => {
            fadingOutRef.current = false;
            animateOpacity(0, 1, 500);
          })
          .catch(() => {});
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y, opacity }}
      id="top"
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-16 pt-32 pb-24 overflow-hidden"
    >
      {/* Video background ----------------------------------------------- */}
      <video
        ref={videoRef}
        src="/hero-loop.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        aria-hidden
      />

      {/* Lighter overlay system — paper now reads as a soft halo, not a curtain */}
      {/* Top fade only — keeps nav legible without ghosting the sky */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper/80 via-paper/30 to-transparent z-[1] pointer-events-none"
        aria-hidden
      />
      {/* Soft bottom fade — much shorter and lighter than before */}
      <div
        className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-paper/70 via-paper/25 to-transparent z-[1] pointer-events-none"
        aria-hidden
      />
      {/* Behind-the-text scrim — just a soft radial-ish glow so text has a backstop */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(250,248,243,0.55) 0%, rgba(250,248,243,0.20) 45%, rgba(250,248,243,0) 75%)',
        }}
        aria-hidden
      />

      {/* Content -------------------------------------------------------- */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <h1 className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-[-0.03em] text-ink text-balance">
          {HEADING_WORDS.map((word, i) => (
            <motion.span
              key={`w-${i}`}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.85,
                delay: 0.3 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.22em]"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block italic text-moss font-normal"
          >
            to last.
          </motion.span>
        </h1>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-12"
        >
          <CTAButton href="#projects" variant="paper" size="md">
            See selected work
          </CTAButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
