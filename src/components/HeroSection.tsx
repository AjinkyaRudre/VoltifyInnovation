import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-electrical-engineer.jpg";
import Logo from "@/assets/voltify-logo.png";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/90 via-dark-gray/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-1 mb-6">
            <img src={Logo} alt="Voltify Logo" className="h-[60px] sm:h-[80px] md:h-[100px] w-auto mb-3 sm:mb-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-center sm:text-left">
              Voltify{" "} <span className="text-electric-blue">Innovation</span>
            </h1>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 animate-slide-in-left text-center sm:text-left">
            "We are a Service You Can Trust"
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-gray-300 animate-slide-in-left delay-200 text-center sm:text-left">
            Licensed electrical engineering & contracting firm delivering expert solutions across residential, industrial, and commercial sectors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left delay-300 items-center sm:items-start">
            <a href="#contact" className="w-full sm:w-fit">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-electric-blue hover:bg-electric-blue-dark text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 animate-electric-pulse"
              >
                Contact Us Now
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </a>

            <a href="#services" className="w-full sm:w-fit">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-dark-gray text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold transition-all duration-300"
              >
                Our Services
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 animate-scale-in delay-500">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-electric-blue">15+</div>
              <div className="text-xs sm:text-sm text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-electric-blue">24/7</div>
              <div className="text-xs sm:text-sm text-gray-300">Emergency Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-electric-blue">5+</div>
              <div className="text-xs sm:text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-electric-blue">100%</div>
              <div className="text-xs sm:text-sm text-gray-300">Licensed & Certified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};