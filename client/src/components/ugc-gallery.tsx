import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

type GalleryItem = {
  type: "image";
  src: string;
  alt: string;
} | {
  type: "video";
  src: string;
  alt: string;
};

const ugcItems: GalleryItem[] = [
  { type: "video", src: "/images/ugc/video-1.mp4", alt: "Video Content 1" },
  { type: "video", src: "/images/ugc/video-5.mov", alt: "Video Content 5" },
  { type: "image", src: "/images/ugc/ugc-3.jpg", alt: "UGC Content 3" },
  { type: "video", src: "/images/ugc/video-2.mp4", alt: "Video Content 2" },
  { type: "video", src: "/images/ugc/video-6.mov", alt: "Video Content 6" },
  { type: "video", src: "/images/ugc/video-4.mov", alt: "Video Content 4" },
];

function VideoItem({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

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
        className="relative py-12 md:py-20 px-6 md:px-10"
        style={{ background: "#f2efe9" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-[#8a7a5a] text-xs tracking-[0.3em] uppercase font-mono block mb-4">UGC</span>
            <h2 className="font-serif font-light text-[#1a1a1a] text-2xl md:text-4xl hidden" data-testid="text-ugc-heading">
              The Media
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
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
                  <VideoItem src={item.src} alt={item.alt} />
                ) : (
                  <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale-[30%] hover:grayscale-0 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
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
              <video
                src={ugcItems[lightbox].src}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover rounded-md"
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
