import { useRef, useState, useEffect, useCallback } from "react";

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

export function Carousel3D() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lastMouseRef = useRef(0);
  const lastTimeRef = useRef(0);
  const autoRotateRef = useRef(true);
  const animationRef = useRef<number>();

  const anglePerItem = 360 / carouselImages.length;
  const radius = typeof window !== "undefined" && window.innerWidth < 768 ? 250 : 400;

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
      setRotation((prev) => prev + 0.15);
    }
    if (!isDragging && Math.abs(velocity) > 0.1) {
      setRotation((prev) => prev + velocity);
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
    setDragStart(e.clientX);
    lastMouseRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    setVelocity(0);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    setRotation((prev) => prev + delta * 0.3);
    setDragStart(e.clientX);

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

  return (
    <section
      ref={sectionRef}
      data-testid="section-carousel"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #181410 0%, #0a0a0a 70%)",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase font-mono block mb-4">Gallery</span>
          <h2 className="font-serif font-light text-[#f5f0eb] text-2xl md:text-4xl" data-testid="text-carousel-heading">
            The Portfolio
          </h2>
        </div>
      </div>

      <div
        className={`relative mx-auto transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{
          height: typeof window !== "undefined" && window.innerWidth < 768 ? "320px" : "450px",
          perspective: "1200px",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        data-testid="carousel-container"
      >
        <div
          className="absolute left-1/2 top-1/2 preserve-3d"
          style={{
            transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
            willChange: "transform",
          }}
        >
          {carouselImages.map((img, index) => {
            const angle = index * anglePerItem;
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={index}
                className="absolute backface-hidden"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  left: "-100px",
                  top: "-150px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="relative overflow-hidden rounded-md transition-all duration-300"
                  style={{
                    width: typeof window !== "undefined" && window.innerWidth < 768 ? "160px" : "200px",
                    height: typeof window !== "undefined" && window.innerWidth < 768 ? "240px" : "300px",
                    transform: isHovered ? "translateZ(30px) scale(1.05)" : "translateZ(0)",
                    boxShadow: isHovered
                      ? "0 20px 60px rgba(201, 169, 110, 0.15), 0 0 40px rgba(201, 169, 110, 0.08)"
                      : "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div
                  className="absolute top-full left-0 right-0 h-[60px] mt-1 rounded-md overflow-hidden"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
