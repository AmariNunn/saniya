import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX - 8}px, ${mouseY - 8}px)`;
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
      }
      requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full transition-all duration-200 ease-out"
          style={{
            width: isHovering ? 18 : 16,
            height: isHovering ? 18 : 16,
            backgroundColor: "#f5f0eb",
            boxShadow: isHovering
              ? "0 0 16px 4px hsl(40 50% 55% / 0.5), 0 0 30px 8px hsl(40 50% 55% / 0.2)"
              : "0 0 10px 3px hsl(40 50% 55% / 0.35), 0 0 20px 6px hsl(40 50% 55% / 0.12)",
          }}
        />
      </div>
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full transition-all duration-300 ease-out"
          style={{
            width: isHovering ? 60 : 44,
            height: isHovering ? 60 : 44,
            border: isHovering ? "1.5px solid hsl(40 50% 55% / 0.7)" : "1.5px solid hsl(40 50% 55% / 0.4)",
            backgroundColor: isHovering ? "hsl(40 50% 55% / 0.08)" : "transparent",
          }}
        />
      </div>
    </>
  );
}
