import { Phone, Mail, MapPin, Zap } from "lucide-react";
import { FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Logo from "../assets/voltify-logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-6 flex items-center space-x-1">
              <img src={Logo} alt="Voltify Innovation Logo" className="h-16 w-auto" />
              <span className="text-xl font-bold">Voltify Innovation</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Licensed electrical engineering & contracting firm delivering expert solutions across residential, industrial, and commercial sectors.
            </p>
            <div className="text-electric-blue font-semibold">
              "We are a Service You Can Trust"
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-electric-blue transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-electric-blue transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Safety Maintenance</li>
              <li className="text-gray-300">Electrical Installation</li>
              <li className="text-gray-300">Service Maintenance</li>
              <li className="text-gray-300">Energy Efficiency</li>
              <li className="text-gray-300">MSEDCL Sanctioning</li>
              <li className="text-gray-300">Testing Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-electric-blue mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+91-9870189950</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-electric-blue mt-1 flex-shrink-0" />
                <p className="text-gray-300">akash.dudhe@voltifyinnovation.in</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-electric-blue mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>SR No. 697, Flat No. B2, 1st Floor,</p>
                  <p>Preetam Prakash Residency,</p>
                  <p>Bhosari Gaonthan, Bhosari,</p>
                  <p>Haveli, Pune – 411039</p>
                </div>
              </div>
              {/* Social Icons below contact info */}
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/company/voltify-innovation/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-5 h-5 text-electric-blue hover:text-white transition" />
                </a>
                <a href="https://wa.me/919970189950" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="w-5 h-5 text-green-500 hover:text-white transition" />
                </a>
                <a href="mailto:akash.dudhe@voltifyinnovation.in" target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className="w-5 h-5 text-red-400 hover:text-white transition" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Voltify Innovation. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-300">24/7 Emergency Support</span>
              <span className="text-sm text-electric-blue font-semibold">+91-9870189950</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};