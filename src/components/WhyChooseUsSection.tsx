import { CheckCircle, Award, Clock, FileText } from "lucide-react";

export const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: CheckCircle,
      title: "Licensed & Trusted Experts",
      description: "Fully licensed electrical engineers and certified technicians with proven track record in the industry.",
      features: ["MSEDCL Licensed", "Certified Professionals", "Insured Services", "Safety Compliant"]
    },
    {
      icon: Clock,
      title: "AMC & Emergency Support",
      description: "Comprehensive Annual Maintenance Contracts and 24/7 emergency response for critical electrical issues.",
      features: ["24/7 Support", "AMC Plans", "Quick Response", "Preventive Care"]
    },
    {
      icon: Award,
      title: "Warranty & Certified Material",
      description: "All our work comes with warranty assurance and we use only certified, high-quality electrical materials.",
      features: ["Extended Warranty", "Quality Materials", "Brand Partners", "Performance Guarantee"]
    },
    {
      icon: FileText,
      title: "Documentation & Regulatory Guidance",
      description: "Complete assistance with regulatory compliance, documentation, and statutory approvals for electrical installations.",
      features: ["Regulatory Compliance", "Complete Documentation", "MSEDCL Liaison", "Legal Support"]
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Why Choose <span className="text-electric-blue">Voltify Innovation</span>?
          </h2>
          <div className="w-24 h-1 bg-electric-blue mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We stand out in the electrical industry through our commitment to excellence, safety, and customer satisfaction.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={reason.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start space-x-6">
                <div className="bg-electric-blue/10 p-4 rounded-lg flex-shrink-0 group-hover:bg-electric-blue group-hover:animate-electric-pulse transition-all duration-300">
                  <reason.icon className="h-8 w-8 text-electric-blue group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-dark-gray mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {reason.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {reason.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                        <span className="text-sm text-dark-gray font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-dark-gray mb-8">Our Certifications & Partnerships</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-electric-blue/10 p-6 rounded-lg mb-4 mx-auto w-fit">
                  <Award className="h-8 w-8 text-electric-blue" />
                </div>
                <div className="font-semibold text-dark-gray">MSEDCL Licensed</div>
                <div className="text-sm text-muted-foreground">Authorized Contractor</div>
              </div>
              <div className="text-center">
                <div className="bg-electric-blue/10 p-6 rounded-lg mb-4 mx-auto w-fit">
                  <CheckCircle className="h-8 w-8 text-electric-blue" />
                </div>
                <div className="font-semibold text-dark-gray">ISO Certified</div>
                <div className="text-sm text-muted-foreground">Quality Standards</div>
              </div>
              <div className="text-center">
                <div className="bg-electric-blue/10 p-6 rounded-lg mb-4 mx-auto w-fit">
                  <FileText className="h-8 w-8 text-electric-blue" />
                </div>
                <div className="font-semibold text-dark-gray">Govt. Approved</div>
                <div className="text-sm text-muted-foreground">Regulatory Compliance</div>
              </div>
              <div className="text-center">
                <div className="bg-electric-blue/10 p-6 rounded-lg mb-4 mx-auto w-fit">
                  <Clock className="h-8 w-8 text-electric-blue" />
                </div>
                <div className="font-semibold text-dark-gray">10+ Years</div>
                <div className="text-sm text-muted-foreground">Industry Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};