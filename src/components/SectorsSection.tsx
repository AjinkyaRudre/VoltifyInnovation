import { Home, Factory, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const SectorsSection = () => {
  const sectors = [
    {
      icon: Home,
      title: "Residential",
      description: "Complete electrical solutions for homes, apartments, and residential complexes.",
      services: [
        "House Wiring & Rewiring",
        "Smart Home Solutions", 
        "Safety Upgrades",
        "Appliance Installation",
        "Energy Efficiency Solutions"
      ],
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Factory,
      title: "Industrial", 
      description: "Heavy-duty electrical systems for manufacturing and industrial facilities.",
      services: [
        "Industrial Panel Installation",
        "Motor Control Systems",
        "Power Distribution",
        "Machinery Wiring", 
        "Electrical Maintenance"
      ],
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Building,
      title: "Commercial",
      description: "Professional electrical services for offices, retail, and commercial buildings.",
      services: [
        "Office Electrical Systems",
        "Lighting Solutions",
        "Security Systems",
        "Data Center Wiring",
        "Emergency Systems"
      ],
      bgColor: "bg-purple-50", 
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Sectors We <span className="text-electric-blue">Serve</span>
          </h2>
          <div className="w-24 h-1 bg-electric-blue mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From residential homes to large industrial complexes, we provide specialized electrical solutions tailored to each sector's unique requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <Card 
              key={sector.title}
              className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-3 animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-0">
                <div className={`${sector.bgColor} p-8 text-center group-hover:bg-electric-blue transition-all duration-300`}>
                  <div className="bg-white p-6 rounded-full mb-6 mx-auto w-fit shadow-lg group-hover:animate-electric-pulse">
                    <sector.icon className={`h-12 w-12 ${sector.iconColor} group-hover:text-electric-blue transition-colors`} />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-gray mb-4 group-hover:text-white transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                    {sector.description}
                  </p>
                </div>
                
                <div className="p-8">
                  <h4 className="font-semibold text-dark-gray mb-4">Key Services:</h4>
                  <ul className="space-y-3">
                    {sector.services.map((service) => (
                      <li key={service} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-electric-blue rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-tech-gradient rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              No matter which sector you're in, our expert team is ready to provide customized electrical solutions that meet your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-electric-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Request Free Consultation
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-electric-blue transition-colors">
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};