import { Shield, Award, Users, Wrench } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Licensed & Trusted",
      description: "Fully licensed electrical engineering and contracting firm with certified professionals."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Delivering high-quality solutions with industry-standard certifications and warranties."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced electrical engineers and technicians committed to excellence."
    },
    {
      icon: Wrench,
      title: "Comprehensive Solutions",
      description: "From installation to maintenance, we provide complete electrical solutions."
    }
  ];

  return (
    <section id="about" className="py-20 bg-light-gray" aria-label="About section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            About <span className="text-electric-blue">Voltify Innovation</span>
          </h2>
          <div className="w-24 h-1 bg-electric-blue mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Voltify Innovation is a certified electrical engineering and contracting firm offering specialized solutions across residential, industrial, and commercial sectors. We combine technical expertise with innovative approaches to deliver reliable, safe, and efficient electrical systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in group hover:-translate-y-2"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-electric-blue/10 p-4 rounded-lg mb-6 w-fit">
                <feature.icon className="h-8 w-8 text-electric-blue group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-dark-gray mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Company Stats */}
        <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-lg animate-fade-in">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="bg-electric-blue/10 p-6 rounded-full w-fit mx-auto">
                <Shield className="h-12 w-12 text-electric-blue" />
              </div>
              <h3 className="text-2xl font-bold text-dark-gray">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower infrastructure with expert electrical solutions, ensuring safety, efficiency, and reliability in every project we undertake.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-electric-blue/10 p-6 rounded-full w-fit mx-auto">
                <Award className="h-12 w-12 text-electric-blue" />
              </div>
              <h3 className="text-2xl font-bold text-dark-gray">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the most trusted electrical engineering partner, leading innovation in sustainable and smart electrical solutions.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-electric-blue/10 p-6 rounded-full w-fit mx-auto">
                <Users className="h-12 w-12 text-electric-blue" />
              </div>
              <h3 className="text-2xl font-bold text-dark-gray">Our Values</h3>
              <p className="text-muted-foreground">
                Safety first, quality assured, customer-centric approach, and continuous innovation in all our electrical solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};