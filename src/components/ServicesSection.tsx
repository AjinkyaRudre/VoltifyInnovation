import { 
  Shield, 
  Zap, 
  Wrench, 
  Battery, 
  FileCheck, 
  TestTube, 
  Monitor, 
  Package 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Safety Maintenance",
      description: "Comprehensive electrical safety inspections, preventive maintenance, and emergency repairs to ensure system reliability."
    },
    {
      icon: Zap,
      title: "Electrical Installation",
      description: "Professional installation of electrical systems, panels, wiring, and components for all types of properties."
    },
    {
      icon: Wrench,
      title: "Service Maintenance", 
      description: "Regular maintenance services including AMC support, troubleshooting, and performance optimization."
    },
    {
      icon: Battery,
      title: "Energy Efficiency & Power Quality",
      description: "Power factor correction, energy audits, and solutions to improve electrical efficiency and reduce costs."
    },
    {
      icon: FileCheck,
      title: "MSEDCL Sanctioning & Liaisoning",
      description: "Complete assistance with MSEDCL approvals, documentation, and regulatory compliance processes."
    },
    {
      icon: TestTube,
      title: "Electrical Testing Services",
      description: "Comprehensive testing including insulation resistance, earth pit testing, and electrical system diagnostics."
    },
    {
      icon: Monitor,
      title: "BMS & ELV Solutions",
      description: "Building Management Systems, CCTV, fire alarms, access control, and other extra-low voltage systems."
    },
    {
      icon: Package,
      title: "Electrical Material Supply",
      description: "Supply of certified electrical materials, components, and equipment from trusted manufacturers."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white" aria-label="Services section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Our <span className="text-electric-blue">Services</span>
          </h2>
          <div className="w-24 h-1 bg-electric-blue mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive electrical solutions designed to meet the unique needs of residential, industrial, and commercial clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="bg-electric-blue/10 p-4 rounded-lg mb-6 w-fit group-hover:bg-electric-blue group-hover:animate-electric-pulse transition-all duration-300">
                  <service.icon className="h-8 w-8 text-electric-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-dark-gray mb-3 group-hover:text-electric-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Highlight */}
        <div className="mt-16 bg-tech-gradient rounded-2xl p-8 md:p-12 text-white animate-fade-in">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">24/7 Emergency Support</h3>
            <p className="text-xl mb-8 opacity-90">
              Electrical emergencies don't wait for business hours. Our expert team is available round-the-clock to handle urgent electrical issues and ensure your safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-2xl font-bold">Emergency Helpline</div>
                <div className="text-electric-blue-light">+91-9970189950</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-2xl font-bold">Response Time</div>
                <div className="text-electric-blue-light">Within 2 Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};