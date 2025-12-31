import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/voltify-logo.png";

const productLinks = [
  "Active Harmonic Filter",
  "Static Var Generator (SVG)",
  "Hybrid Filter",
  "RTPCF Panel",
  "APFC Panel",
  "K-Rated Transformers",
  "Battery Energy Storage System (BESS)",
  "Solar Inverter",
  "UPS",
  "Frequency Converter",
  "Servo Control Voltage Stabilizer (SCVS)",
  "PLC Based Load Bank",
  "Electronic Load Bank",
  "DC Power Supply",
  "PV Solar Plant",
  "Industrial Battery Charger",
];

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isProductsOpenMobile, setIsProductsOpenMobile] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Services", href: "#services" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <img src={Logo} alt="Voltify Logo" className="h-10 md:h-16 w-auto" />
            <span className="text-base md:text-xl font-bold text-dark-gray">
              Voltify Innovation
            </span>
          </div>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.name === "Products" ? (
                <div key={link.name} className="relative group">
                  <button className="text-dark-gray hover:text-electric-blue font-medium">
                    Products
                  </button>

                  {/* Dropdown */}
                  <div
                    className="
                      absolute top-full left-0 mt-3 w-96
                      bg-white shadow-xl rounded-lg border
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      z-50
                    "
                  >
                    <ul className="p-5 space-y-2">
                      {productLinks.map((product) => (
                        <li key={product}>
                          <a
                            href={`#${product
                              .toLowerCase()
                              .replace(/\s+/g, "-")
                              .replace(/[()]/g, "")}`}
                            className="block text-sm text-gray-700 hover:text-electric-blue hover:pl-2 transition-all"
                          >
                            {product}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-dark-gray hover:text-electric-blue font-medium relative ${
                    activeSection === link.href.substring(1)
                      ? "text-electric-blue"
                      : ""
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-electric-blue rounded-full" />
                  )}
                </a>
              )
            )}

            <Button
              onClick={scrollToContact}
              className="bg-electric-blue hover:bg-electric-blue-dark text-white animate-electric-pulse"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* ---------------- MOBILE NAV ---------------- */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) =>
              link.name === "Products" ? (
                <div key={link.name}>
                  <button
                    onClick={() =>
                      setIsProductsOpenMobile(!isProductsOpenMobile)
                    }
                    className="w-full text-left py-2 font-semibold"
                  >
                    Products
                  </button>

                  {isProductsOpenMobile && (
                    <div className="pl-4 space-y-2">
                      {productLinks.map((product) => (
                        <a
                          key={product}
                          href={`#${product
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[()]/g, "")}`}
                          className="block text-sm text-gray-600 hover:text-electric-blue"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {product}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-dark-gray hover:text-electric-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            )}

            <Button
              onClick={() => {
                scrollToContact();
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 bg-electric-blue text-white"
            >
              Get Quote
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
