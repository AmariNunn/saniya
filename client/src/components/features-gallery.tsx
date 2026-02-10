import { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    if (!container || !scrollContent) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrollProgress = Math.max(0, Math.min(1,
          (viewportHeight - rect.top) / (containerHeight + viewportHeight)
        ));
        const maxTranslate = scrollContent.scrollWidth - window.innerWidth;
        scrollContent.style.transform = `translateX(${-scrollProgress * maxTranslate}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="features" data-testid="section-features" className="relative" style={{ background: "#0a0a0a" }}>
      <div ref={headerRef} className="px-6 md:px-10 pt-24 md:pt-40 pb-8">
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

      <div
        ref={containerRef}
        className="relative"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 pl-6 md:pl-10 pr-[50vw] items-center"
            style={{ willChange: "transform" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 group"
                data-testid={`card-feature-${index}`}
                style={{
                  width: index % 3 === 0 ? "45vw" : index % 3 === 1 ? "35vw" : "40vw",
                  maxWidth: index % 3 === 0 ? "600px" : index % 3 === 1 ? "450px" : "520px",
                }}
              >
                <div className="relative overflow-hidden rounded-md film-grain">
                  <img
                    src={feature.src}
                    alt={feature.title}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      height: index % 2 === 0 ? "65vh" : "55vh",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <p className="text-[#f5f0eb] font-serif text-lg md:text-xl" data-testid={`text-feature-title-${index}`}>
                      {feature.title}
                    </p>
                    {feature.subtitle && (
                      <p className="text-[#a09890] text-xs mt-0.5">{feature.subtitle}</p>
                    )}
                    <p className="text-[#c9a96e] text-xs tracking-wider mt-1 font-mono">{feature.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
