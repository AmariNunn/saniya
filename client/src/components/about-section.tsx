import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="section-about"
      className="relative py-24 md:py-40 px-6 md:px-10"
      style={{ background: "#f2efe9" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-[#8a7a5a] text-xs tracking-[0.3em] uppercase font-mono block mb-4">About</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-7 relative">
            <div className={`overflow-hidden rounded-md transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <img
                src="/images/hero/about.jpg"
                alt="Saniya Allen portrait"
                className="w-full h-auto object-cover animate-float"
                loading="lazy"
                data-testid="img-about"
                style={{ maxHeight: "70vh" }}
              />
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-6">
            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] font-light leading-tight" data-testid="text-about-heading">
                Saniya Allen
              </h2>
            </div>

            <div className={`h-px bg-[#8a7a5a]/30 transition-all duration-1000 delay-500 ${visible ? "w-full" : "w-0"}`} />

            <div className={`transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-[#5a5550] text-sm md:text-base leading-relaxed" data-testid="text-bio">
                Nashville-based model with a passion for editorial storytelling, brand campaigns, and creative direction. With experience spanning high-fashion editorials, commercial shoots, and UGC content creation, Saniya brings a unique blend of elegance and authenticity to every project.
              </p>
            </div>

            <div className={`transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-[#5a5550]/70 text-sm leading-relaxed">
                Featured in Photo Vogue, IRK Magazine Paris, and campaigns for Johanna Ortiz, JBW Watches, Trixie Cosmetics, and more. Available for bookings worldwide.
              </p>
            </div>

            <div className={`flex gap-6 mt-4 transition-all duration-700 delay-[900ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8a7a5a] text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#6a5a3a] cursor-none"
                data-cursor-hover
                data-testid="link-instagram"
              >
                Instagram
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-[#8a7a5a] text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#6a5a3a] cursor-none"
                data-cursor-hover
                data-testid="link-inquiries-about"
              >
                Inquiries
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
