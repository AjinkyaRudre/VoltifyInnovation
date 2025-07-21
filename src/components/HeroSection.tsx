import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-electrical-engineer.jpg";
import Logo from "@/assets/voltify-logo.png";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/90 via-dark-gray/70 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-electric-blue rounded-full animate-electric-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-electric-blue-light rounded-full animate-electric-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-electric-blue rounded-full animate-electric-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white animate-fade-in">
          <div className="flex items-center space-x-1 mb-6">
            <img src={Logo} alt="Voltify Logo" className="h-[100px] w-auto" />
            <h1 className="text-5xl md:text-7xl font-bold">
              Voltify{" "} <span className="text-electric-blue">Innovation</span>
            </h1>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-6 animate-slide-in-left">
            "We are a Service You Can Trust"
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-slide-in-left delay-200">
            Licensed electrical engineering & contracting firm delivering expert solutions across residential, industrial, and commercial sectors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left delay-300">
            <a href="#contact" className="w-fit">
              <Button
                size="lg"
                className="bg-electric-blue hover:bg-electric-blue-dark text-white text-lg px-8 py-4 animate-electric-pulse"
              >
                Contact Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>

            <a href="#services" className="w-fit">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-dark-gray text-lg px-8 py-4"
              >
                Our Services
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-scale-in delay-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue">15+</div>
              <div className="text-sm text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue">24/7</div>
              <div className="text-sm text-gray-300">Emergency Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue">5+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-electric-blue">100%</div>
              <div className="text-sm text-gray-300">Licensed & Certified</div>
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