import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { src: "/images/features/photo-vogue.jpg", title: "The Photo Vogue", year: "2024" },
  { src: "/images/features/irk-magazine.jpg", title: "IRK Magazine", subtitle: "Paris", year: "2024" },
  { src: "/images/features/johanna-ortiz.jpg", title: "Johanna Ortiz", year: "2024" },
  { src: "/images/features/jbw-watches.jpg", title: "JBW Watches", year: "2024" },
  { src: "/images/features/fanm-djanm.png", title: "Fanm Djanm", year: "2024" },
  { src: "/images/features/trixie-cosmetics.jpg", title: "Trixie Cosmetics", year: "2023" },
  { src: "/images/features/earthbound.jpg", title: "Earthbound Trading Co", year: "2023" },
  { src: "/images/features/top-golf.jpg", title: "Top Golf", year: "2023" },
  { src: "/images/features/laura-citron.jpg", title: "Laura Citron", year: "2023" },
  { src: "/images/features/chicka-d.jpg", title: "Chicka-d Clothing", year: "2023" },
  { src: "/images/features/nashville-voyager.jpg", title: "Nashville Voyager", year: "2022" },
  { src: "/images/features/jlt.jpg", title: "JLT.com", year: "2022" },
];

export function FeaturesGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById("features-header");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + features.length) % features.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <section id="features" data-testid="section-features" className="relative h-screen overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div id="features-header" className="absolute top-24 md:top-32 left-0 right-0 z-20 px-6 md:px-10 pointer-events-none">
        <div className="max-w-[1600px] mx-auto">
          <div className={`transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase font-mono block mb-4">Portfolio</span>
          </div>
          <h2
            className={`font-serif font-light text-[#f5f0eb]/10 leading-none transition-all duration-1000 delay-200 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", WebkitTextStroke: "1px rgba(201, 169, 110, 0.2)" }}
            data-testid="text-features-heading"
          >
            FEATURES
          </h2>
        </div>
      </div>
      <div className="relative h-full w-full flex items-center justify-center text-[#757538]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
            }}
            className="absolute w-full max-w-[90vw] md:max-w-[70vw] h-[60vh] md:h-[70vh]"
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg group shadow-2xl">
              <img
                src={features[currentIndex].src}
                alt={features[currentIndex].title}
                className="w-full h-full object-contain transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-[#c9a96e] text-xs md:text-sm tracking-[0.3em] uppercase font-mono mb-2">
                    {features[currentIndex].year}
                  </p>
                  <h3 className="text-[#f5f0eb] font-serif text-3xl md:text-5xl lg:text-6xl mb-2">
                    {features[currentIndex].title}
                  </h3>
                  {features[currentIndex].subtitle && (
                    <p className="text-[#a09890] text-sm md:text-lg tracking-wide uppercase">
                      {features[currentIndex].subtitle}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-12 md:bottom-20 z-30 flex items-center justify-center gap-8 md:gap-12">
          <button
            onClick={() => paginate(-1)}
            className="group flex items-center gap-2 text-[#a09890] hover:text-[#c9a96e] transition-colors cursor-none p-4"
            data-cursor-hover
            data-testid="button-prev"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px] tracking-[0.3em] uppercase hidden md:block">Prev</span>
          </button>

          <div className="flex gap-2">
            {features.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === currentIndex ? "w-8 bg-[#c9a96e]" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="group flex items-center gap-2 text-[#a09890] hover:text-[#c9a96e] transition-colors cursor-none p-4"
            data-cursor-hover
            data-testid="button-next"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase hidden md:block">Next</span>
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
