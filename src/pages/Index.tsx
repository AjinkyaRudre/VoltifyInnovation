import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { SectorsSection } from "@/components/SectorsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageLoader } from "@/components/PageLoader";

const Index = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate page load time
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader />
      <div className={`min-h-screen transition-opacity duration-700 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <SectorsSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
