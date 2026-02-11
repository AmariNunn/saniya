import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const tickerItems = [
  "PHOTO VOGUE",
  "IRK MAGAZINE",
  "JOHANNA ORTIZ",
  "JBW WATCHES",
  "TRIXIE COSMETICS",
  "NASHVILLE",
  "AVAILABLE WORLDWIDE",
  "EDITORIAL",
  "COMMERCIAL",
  "UGC CREATOR",
];

export function TickerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const TickerRow = ({ reverse = false }: { reverse?: boolean }) => (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div className={`inline-flex ${reverse ? "animate-ticker-reverse" : "animate-ticker"}`}>
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-4">
            <Star className="w-3 h-3 text-[#8a7a5a] fill-[#8a7a5a]" />
            <span className="text-[#1a1a1a]/50 text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      data-testid="section-ticker"
      className={`relative py-6 border-y border-[#1a1a1a]/10 transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "#f2efe9" }}
    >
      <TickerRow />
      <TickerRow reverse />
    </section>
  );
}
