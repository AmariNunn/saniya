import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

type GalleryItem = {
  type: "image";
  src: string;
  alt: string;
} | {
  type: "video";
  embedUrl: string;
  alt: string;
};

const ugcItems: GalleryItem[] = [
  { type: "video", embedUrl: "https://drive.google.com/file/d/1-Vid1A7HbsLAlk8jJW3cWrt2VVz5-CPd/preview", alt: "Video Content 1" },
  { type: "image", src: "/images/ugc/ugc-2.jpg", alt: "UGC Content 2" },
  { type: "image", src: "/images/ugc/ugc-3.jpg", alt: "UGC Content 3" },
  { type: "image", src: "/images/ugc/ugc-4.jpg", alt: "UGC Content 4" },
  { type: "video", embedUrl: "https://drive.google.com/file/d/1KHt0JBpc4Ih8Px67TLLgU_G45V7i9TUz/preview", alt: "Video Content 2" },
  { type: "video", embedUrl: "https://drive.google.com/file/d/1LnEoWervyVhkpu0egk-YYNDGT_EkTthU/preview", alt: "Video Content 3" },
];

export function UgcGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timers: NodeJS.Timeout[] = [];
    ugcItems.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleItems(prev => new Set(prev).add(i));
      }, i * 120));
    });
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightbox === null) return;
    if (e.key === "Escape") setLightbox(null);
    if (e.key === "ArrowRight") setLightbox((prev) => prev !== null ? (prev + 1) % ugcItems.length : null);
    if (e.key === "ArrowLeft") setLightbox((prev) => prev !== null ? (prev - 1 + ugcItems.length) % ugcItems.length : null);
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <section
        ref={sectionRef}
        id="ugc"
        data-testid="section-ugc"
        className="relative py-24 md:py-40 px-6 md:px-10"
        style={{ background: "#0e0e0e" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-[#c9a96e] text-xs tracking-[0.3em] uppercase font-mono block mb-4">Content</span>
          </div>
          <h2
            className={`font-serif font-light text-[#f5f0eb]/10 leading-none mb-12 md:mb-16 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)", WebkitTextStroke: "1px rgba(201, 169, 110, 0.2)" }}
            data-testid="text-ugc-heading"
          >
            UGC
          </h2>

          <div className="masonry-grid">
            {ugcItems.map((item, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-md cursor-none transition-all duration-700 ${
                  visibleItems.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                data-testid={`card-ugc-${index}`}
                data-cursor-hover
                onClick={() => setLightbox(index)}
              >
                {item.type === "video" ? (
                  <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                    <iframe
                      src={item.embedUrl}
                      title={item.alt}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-all duration-500 grayscale-[30%] hover:grayscale-0 hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setLightbox(null)}
          data-testid="lightbox"
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <button
            data-testid="button-close-lightbox"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 z-10 text-[#f5f0eb]/70 hover:text-[#f5f0eb] transition-colors cursor-none"
            data-cursor-hover
          >
            <X className="w-6 h-6" />
          </button>
          {ugcItems[lightbox].type === "video" ? (
            <div
              className="relative z-10 w-[90vw] max-w-[500px] animate-fade-in-up"
              style={{ aspectRatio: "9/16" }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={(ugcItems[lightbox] as { embedUrl: string }).embedUrl}
                title={ugcItems[lightbox].alt}
                className="w-full h-full border-0 rounded-md"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={(ugcItems[lightbox] as { src: string }).src}
              alt={ugcItems[lightbox].alt}
              className="relative z-10 max-w-[90vw] max-h-[85vh] object-contain rounded-md animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
