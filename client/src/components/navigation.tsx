import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-[#f2efe9]/90 backdrop-blur-md border-b border-[#1a1a1a]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
        <button
          data-testid="link-home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-lg md:text-xl tracking-[0.15em] text-[#1a1a1a] cursor-none"
          data-cursor-hover
        >
          SANIYA ALLEN
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Portfolio", id: "portfolio" },
            { label: "Features", id: "features" },
            { label: "UGC", id: "ugc" },
            { label: "Inquiries", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              data-testid={`link-${item.id}`}
              onClick={() => scrollTo(item.id)}
              className="text-[#5a5550] text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#8a7a5a] cursor-none"
              data-cursor-hover
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          data-testid="button-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#1a1a1a] cursor-none"
          data-cursor-hover
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#f2efe9]/95 backdrop-blur-md border-t border-[#1a1a1a]/10 px-6 py-6 flex flex-col gap-5">
          {[
            { label: "Portfolio", id: "portfolio" },
            { label: "Features", id: "features" },
            { label: "UGC", id: "ugc" },
            { label: "Inquiries", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              data-testid={`link-mobile-${item.id}`}
              onClick={() => scrollTo(item.id)}
              className="text-[#5a5550] text-sm tracking-[0.2em] uppercase text-left transition-colors duration-300 hover:text-[#8a7a5a] cursor-none"
              data-cursor-hover
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
