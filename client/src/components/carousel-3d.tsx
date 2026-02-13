import { useRef, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const carouselImages = [
  { src: "/images/carousel/carousel-1.jpg", alt: "Portfolio 1" },
  { src: "/images/carousel/carousel-2.jpg", alt: "Portfolio 2" },
  { src: "/images/carousel/carousel-3.png", alt: "Portfolio 3" },
  { src: "/images/carousel/carousel-4.jpg", alt: "Portfolio 4" },
  { src: "/images/carousel/carousel-5.jpg", alt: "Portfolio 5" },
  { src: "/images/carousel/carousel-6.jpg", alt: "Portfolio 6" },
  { src: "/images/carousel/carousel-7.png", alt: "Portfolio 7" },
  { src: "/images/carousel/carousel-8.jpg", alt: "Portfolio 8" },
];

function useResponsiveSizes() {
  const [sizes, setSizes] = useState(() => computeSizes(typeof window !== "undefined" ? window.innerWidth : 1024));

  useEffect(() => {
    const onResize = () => setSizes(computeSizes(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return sizes;
}

function computeSizes(w: number) {
  if (w < 400) {
    return { radius: 160, cardWidth: 110, cardHeight: 165, containerHeight: 250, isMobile: true };
  }
  if (w < 640) {
    return { radius: 200, cardWidth: 130, cardHeight: 195, containerHeight: 280, isMobile: true };
  }
  if (w < 768) {
    return { radius: 240, cardWidth: 150, cardHeight: 225, containerHeight: 320, isMobile: true };
  }
  if (w < 1024) {
    return { radius: 320, cardWidth: 170, cardHeight: 255, containerHeight: 380, isMobile: false };
  }
  return { radius: 400, cardWidth: 200, cardHeight: 300, containerHeight: 450, isMobile: false };
}

export function Carousel3D() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef(0);
  const dragStartXRef = useRef(0);
  const lastMouseRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoRotateRef = useRef(true);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const { radius, cardWidth, cardHeight, containerHeight, isMobile } = useResponsiveSizes();
  const anglePerItem = 360 / carouselImages.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const animate = useCallback(() => {
    if (!isDragging && autoRotateRef.current) {
      rotationRef.current += 0.15;
      setRotation(rotationRef.current);
    }
    if (!isDragging && Math.abs(velocity) > 0.1) {
      rotationRef.current += velocity;
      setRotation(rotationRef.current);
      setVelocity((prev) => prev * 0.95);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [isDragging, velocity]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    autoRotateRef.current = false;
    dragStartRef.current = e.clientX;
    dragStartXRef.current = e.clientX;
    lastMouseRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    dragDistanceRef.current = 0;
    setVelocity(0);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartRef.current;
    dragDistanceRef.current += Math.abs(delta);
    rotationRef.current += delta * 0.3;
    setRotation(rotationRef.current);
    dragStartRef.current = e.clientX;

    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      setVelocity((e.clientX - lastMouseRef.current) / dt * 15);
    }
    lastMouseRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const onPointerUp = () => {
    setIsDragging(false);
    setTimeout(() => { autoRotateRef.current = true; }, 3000);
  };

  const handleImageClick = (index: number) => {
    if (dragDistanceRef.current < 5) {
      setLightbox(index);
      autoRotateRef.current = false;
    }
  };

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((prev) => prev !== null ? (prev + 1) % carouselImages.length : null);
      if (e.key === "ArrowLeft") setLightbox((prev) => prev !== null ? (prev - 1 + carouselImages.length) % carouselImages.length : null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <>
      <section
        ref={sectionRef}
        data-testid="section-carousel"
        className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at center, #e8e4dc 0%, #f2efe9 70%)",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-[#8a7a5a] text-xs tracking-[0.3em] uppercase font-mono block mb-4">Portfolio</span>
            <h2 className="font-serif font-light text-[#1a1a1a] text-2xl md:text-4xl" data-testid="text-carousel-heading">
              The Portfolio
            </h2>
          </div>
        </div>

        <div
          ref={containerRef}
          className={`relative mx-auto transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{
            height: `${containerHeight}px`,
            perspective: "1200px",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          data-testid="carousel-container"
        >
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
              transition: isDragging ? "none" : "transform 0.1s linear",
            }}
          >
            {carouselImages.map((img, index) => {
              const angle = index * anglePerItem;
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    left: `${-cardWidth / 2}px`,
                    top: `${-cardHeight / 2}px`,
                  }}
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                  onClick={() => handleImageClick(index)}
                  data-testid={`carousel-card-${index}`}
                >
                  <div
                    className="relative overflow-hidden rounded-md transition-all duration-300"
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      transform: isHovered ? "translateZ(30px) scale(1.05)" : "translateZ(0)",
                      boxShadow: isHovered
                        ? "0 20px 60px rgba(201, 169, 110, 0.15), 0 0 40px rgba(201, 169, 110, 0.08)"
                        : "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  {!isMobile && (
                    <div
                      className="absolute top-full left-0 right-0 h-[60px] mt-1 rounded-md overflow-hidden pointer-events-none"
                      style={{
                        background: "linear-gradient(to bottom, rgba(201,169,110,0.06), transparent)",
                        transform: "scaleY(-1)",
                        opacity: 0.3,
                        filter: "blur(2px)",
                      }}
                    >
                      <img
                        src={img.src}
                        alt=""
                        className="w-full h-full object-cover object-bottom"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setLightbox(null)}
          data-testid="carousel-lightbox"
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <button
            data-testid="button-close-carousel-lightbox"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 z-10 text-[#f5f0eb]/70 hover:text-[#f5f0eb] transition-colors cursor-none"
            data-cursor-hover
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={carouselImages[lightbox].src}
            alt={carouselImages[lightbox].alt}
            className="relative z-10 max-w-[90vw] max-h-[85vh] object-contain rounded-md animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
