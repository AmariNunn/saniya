import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { FeaturesGallery } from "@/components/features-gallery";
import { UgcGallery } from "@/components/ugc-gallery";
import { Carousel3D } from "@/components/carousel-3d";
import { TickerSection } from "@/components/ticker-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";

export default function Portfolio() {
  return (
    <div className="relative" style={{ background: "#f2efe9" }}>
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TickerSection />
      <FeaturesGallery />
      <UgcGallery />
      <Carousel3D />
      <TickerSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
