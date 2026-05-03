import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import CTAButton from './CTAButton.jsx';

const HEADING_LINE_1 = ['Design', 'for', 'things'];
const HEADING_LINE_2 = ['that', 'ought'];

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const fadeFrameRef = useRef(null);
  const fadingOutRef = useRef(false);

  // Parallax/fade as the user scrolls past the hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // rAF-based crossfade: fade in on canplay, fade out 0.55s before end,
  // then loop seamlessly. Same pattern from the Phase 2 cinematic hero.
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

    const handleCanPlay = () => {
      animateOpacity(0, 1, 500);
    };

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
        videoRef.current.play().then(() => {
          fadingOutRef.current = false;
          animateOpacity(0, 1, 500);
        }).catch(() => {});
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
      className="relative min-h-[100svh] flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-20 md:pb-28 pt-44 md:pt-52 overflow-hidden"
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

      {/* Layered overlays — paper-tinted so the video stays in our palette */}
      {/* Subtle paper wash for warmth */}
      <div className="absolute inset-0 bg-paper/15 z-[1] pointer-events-none" aria-hidden />
      {/* Top fade — keeps nav legible */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-paper to-transparent z-[2] pointer-events-none" aria-hidden />
      {/* Bottom fade — paper rises to meet the type so it reads cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-paper via-paper/85 to-transparent z-[2] pointer-events-none" aria-hidden />

      {/* Content ------------------------------------------------------- */}
      <div className="relative z-10">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-14"
        >
          <CTAButton href="#projects" variant="ink" size="md">
            See selected work
          </CTAButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
