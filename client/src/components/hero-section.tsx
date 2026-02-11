import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    const el = heroRef.current;
    if (el) el.addEventListener("mousemove", onMouseMove);
    return () => { if (el) el.removeEventListener("mousemove", onMouseMove); };
  }, []);

  const nameLetters = "SANIYA ALLEN".split("");

  return (
    <section
      ref={heroRef}
      data-testid="section-hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, hsl(40 50% 55% / 0.04), transparent 60%)`,
          transition: "background 0.3s ease",
        }}
      />

      <div className={`absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${loaded ? "clip-path-full" : "clip-path-hidden"}`}
        style={{
          clipPath: loaded ? "inset(0% 0% 0% 0%)" : "inset(50% 50% 50% 50%)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero/hero-main.jpg')`,
            filter: "brightness(0.35) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="overflow-hidden mb-4">
          <h1 className="font-serif font-light tracking-[0.15em] leading-none flex flex-nowrap justify-center whitespace-nowrap"
            style={{ fontSize: "clamp(1.8rem, 10vw, 9rem)" }}
          >
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={loaded ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: 0.8 + i * 0.05,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-[#f5f0eb]"
                style={{ minWidth: letter === " " ? "0.3em" : undefined }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#a09890] font-mono"
          data-testid="text-subtitle"
        >
          Model &middot; Creative &middot; Muse
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.4, duration: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-[#a09890]/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a96e]/50 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
