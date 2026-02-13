import { useEffect, useRef, useState } from "react";
import { Instagram, Mail, ArrowUp } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      data-testid="section-footer"
      className="relative py-12 md:py-16 px-6 md:px-10 border-t border-[#1a1a1a]/10"
      style={{ background: "#f2efe9" }}
    >
      <div className={`max-w-[1200px] mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5a5550]/60 hover:text-[#8a7a5a] transition-colors duration-300 cursor-none"
              data-cursor-hover
              data-testid="link-instagram-footer"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@saniya.allen?_r=1&_t=ZP-93q86aIHCt5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5a5550]/60 hover:text-[#8a7a5a] transition-colors duration-300 cursor-none"
              data-cursor-hover
              data-testid="link-tiktok-footer"
            >
              <SiTiktok className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@saniyallen.com"
              className="text-[#5a5550]/60 hover:text-[#8a7a5a] transition-colors duration-300 cursor-none"
              data-cursor-hover
              data-testid="link-email-footer"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[#5a5550]/40 text-[10px] tracking-[0.15em] uppercase" data-testid="text-copyright">
            &copy; 2025 Saniya Allen. All Rights Reserved.
          </p>

          <button
            data-testid="button-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[#5a5550]/40 text-[10px] tracking-[0.15em] uppercase hover:text-[#8a7a5a] transition-colors duration-300 cursor-none"
            data-cursor-hover
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
