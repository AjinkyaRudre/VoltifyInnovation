import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedBlogs from "@/components/RelatedBlogs";

import heroImg from "@/assets/Infrared-thermography/Infrared-Thermography-1.png";
import thermographyImg from "@/assets/Infrared-thermography/infrared-thermography.jpeg";
import inspectionImg from "@/assets/Infrared-thermography/ir-inspection-process.jpg";

const InfraredThermography: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Header />
      <Navigation />

      {/* Back to Blog Arrow */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            to="/blog"
            className="inline-flex items-center text-electric-blue hover:text-dark-gray font-semibold transition"
          >
            <span className="mr-2">←</span>
            Back to Blog
          </Link>
        </div>
      </div>

      <main className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Applying Infrared Thermography to Predictive Maintenance
            </h1>
            <p className="text-lg opacity-90">
              Detect equipment faults early with non-contact thermal imaging
            </p>
            <p className="text-sm opacity-75 mt-4">Last Updated: January 28, 2026</p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-14">
          {/* Introduction */}
          <section id="early-warning">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Early Warning Signs Through Thermal Imaging
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              In modern industrial environments, equipment failures rarely happen without warning. In most cases, excess heat is one of the earliest indicators of developing faults. This is why infrared thermography has become a critical tool in predictive maintenance (PdM) programs across industries.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              By identifying abnormal temperature patterns before a breakdown occurs, thermography enables maintenance teams to take corrective action early—reducing downtime, repair costs, and asset damage.
            </p>
            <p className="leading-relaxed text-gray-700 font-semibold text-electric-blue">
              At Voltify Innovation, infrared thermography is used as a reliable, non-contact diagnostic method to improve equipment reliability and operational efficiency.
            </p>
          </section>

          {/* What Is Infrared Thermography */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              What Is Infrared Thermography in Predictive Maintenance?
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Infrared thermography is a condition-based maintenance technique that detects temperature variations in equipment by capturing infrared radiation. These thermal patterns reveal hidden issues that are often invisible to the naked eye.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              Technicians performing infrared predictive maintenance regularly monitor the temperature of critical assets. By trending temperature data over time, it becomes easier to identify deviations from normal operating conditions and investigate potential faults before failure occurs.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              This proactive approach allows facilities to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Reduce unplanned downtime</li>
              <li>Shift from reactive to scheduled maintenance</li>
              <li>Lower maintenance and repair costs</li>
              <li>Extend the operational life of equipment</li>
            </ul>
          </section>

          {/* Why Thermography Is Ideal */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Why Thermography Is Ideal for Predictive Maintenance
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              For predictive maintenance to be cost-effective, it must reduce emergency repairs without adding unnecessary workload. Thermography achieves this by enabling fast, non-destructive inspections.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              Compared to corrective maintenance, thermal inspections:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Take less time</li>
              <li>Do not interrupt operations</li>
              <li>Detect problems early</li>
              <li>Reduce labour and spare part expenses</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              Using thermal imaging cameras, inspections can be completed efficiently while equipment remains energized and operational.
            </p>
          </section>

          {/* Hero Images - Side by Side */}
          <section>
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={heroImg}
                alt="Infrared Thermography Application"
                className="rounded-xl shadow-lg w-full object-cover"
              />
              <img
                src={thermographyImg}
                alt="Thermal Imaging Results"
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </div>
          </section>

          {/* Common Applications */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Common Applications of Thermal Imaging
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Infrared thermography is widely used across electrical and mechanical systems. Typical applications include:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Monitoring bearing temperatures in motors and rotating machinery</li>
                <li>Identifying hot spots in electrical panels and electronic equipment</li>
                <li>Detecting faulty insulation in pipes and process lines</li>
                <li>Locating loose or deteriorated electrical terminations</li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Finding overloaded circuit breakers and power connections</li>
                <li>Identifying fuses operating near rated capacity</li>
                <li>Detecting abnormalities in switchgear and transformers</li>
                <li>Identifying leaks in sealed vessels and pressure systems</li>
              </ul>
            </div>
            <p className="leading-relaxed text-gray-700 mt-4 font-semibold">
              These applications make thermography an essential tool for electrical predictive maintenance and industrial asset management.
            </p>
          </section>

          {/* How Thermal Imaging Works */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              How Thermal Imaging Works
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              A thermal imager captures non-contact infrared temperature measurements and displays them as a two-dimensional thermal image. Unlike spot infrared thermometers, thermal cameras show temperature distribution across entire components and assemblies.
            </p>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
              <h3 className="text-xl font-bold mb-4 text-dark-gray">Key advantages include:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Full equipment temperature profiling</li>
                <li>Comparison of historical and current images</li>
                <li>Easy identification of abnormal heat patterns</li>
                <li>Digital storage for trend analysis and reporting</li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                This data-driven approach improves decision-making and maintenance planning.
              </p>
            </div>
          </section>

          {/* Cost Benefits */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Cost Benefits of Thermography-Based Predictive Maintenance
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Studies by the Federal Energy Management Program (FEMP) show that a properly implemented predictive maintenance program can deliver <span className="font-semibold">30–40% savings compared to reactive maintenance</span>.
            </p>
            <p className="leading-relaxed text-gray-700 mb-6">
              Industry surveys indicate additional benefits such as:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-electric-blue">
                <div className="text-3xl font-bold text-electric-blue mb-2">10x</div>
                <p className="text-gray-700 text-sm">Return on Investment (ROI)</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-electric-blue">
                <div className="text-3xl font-bold text-electric-blue mb-2">25-30%</div>
                <p className="text-gray-700 text-sm">Reduction in maintenance costs</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-electric-blue">
                <div className="text-3xl font-bold text-electric-blue mb-2">70-75%</div>
                <p className="text-gray-700 text-sm">Reduction in equipment breakdowns</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-electric-blue">
                <div className="text-3xl font-bold text-electric-blue mb-2">35-45%</div>
                <p className="text-gray-700 text-sm">Reduction in downtime</p>
              </div>
            </div>
            <p className="leading-relaxed text-gray-700 mb-4">
              To estimate savings, facilities should evaluate:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Cost of unplanned failures</li>
              <li>Labour and spare part expenses</li>
              <li>Production losses due to downtime</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              Once thermography is implemented, tracking asset availability, maintenance spending, and production output clearly demonstrates ROI.
            </p>
          </section>

          {/* Integrating Thermography */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Integrating Infrared Thermography into a PdM Program
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Infrared thermography acts as the first line of defence in predictive maintenance. Technicians can quickly scan equipment during routine inspections without disrupting operations.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              If abnormal temperatures are detected, further investigation can be carried out using:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Vibration analysis</li>
              <li>Motor current signature analysis</li>
              <li>Ultrasound testing</li>
              <li>Lubricant analysis</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              For best results, all condition-monitoring technologies should be integrated into a common maintenance system, allowing shared equipment histories, reports, and work orders.
            </p>
          </section>

          {/* Thermographic Inspection Process */}
          <section className="bg-white rounded-xl shadow-md p-8 border-l-4 border-electric-blue">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Thermographic Inspection Process
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              A structured inspection process ensures consistency and reliable data:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Use existing equipment lists from CMMS or asset registers</li>
              <li>Remove items unsuitable for thermal measurement</li>
              <li>Review maintenance history and prioritise critical assets</li>
              <li>Group inspections into logical 2–3 hour routes</li>
              <li>Capture baseline thermal images under normal conditions</li>
              <li>Document emissivity, alarm thresholds, and inspection notes</li>
              <li>Compare future images against baseline data</li>
            </ol>
            <p className="leading-relaxed text-gray-700 mt-4 font-semibold">
              Consistent data collection enables accurate trend analysis and fault detection.
            </p>
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Thermal Measurement Best Practices
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              To ensure accurate results, follow these guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Ensure equipment operates at minimum 40% load</li>
              <li>Avoid measuring through glass or closed panels</li>
              <li>Open enclosures safely or use IR windows when permitted</li>
              <li>Account for airflow, wind, and ambient temperature</li>
              <li>Understand both hot and cold fault signatures</li>
              <li>Avoid reflective surfaces or use emissivity targets</li>
              <li>Capture both temperature values and thermal images</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              Trending temperature data over time improves fault diagnosis and inspection efficiency.
            </p>
          </section>

          {/* Practical Examples */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Practical Examples of Thermography in Action
            </h2>

            <div className="space-y-6">
              {/* Leaky Gaskets */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  Detecting Leaky Gaskets and Seals
                </h3>
                <p className="text-gray-700">
                  Leaks in vessels and pipelines often show up as localized temperature changes. Scanning along gaskets or seals reveals abnormal heat or cold signatures indicating leakage or insulation failure.
                </p>
              </div>

              {/* Motor Bearings */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  Monitoring Motor Bearings
                </h3>
                <p className="text-gray-700">
                  By capturing baseline thermal images of newly commissioned motors, bearing health can be monitored over time. Rising temperatures indicate lubrication breakdown or bearing wear—allowing scheduled maintenance before motor failure occurs.
                </p>
              </div>
            </div>
          </section>

          {/* Thermography Image */}
          {/* Inspection Process Image */}
          <section className="flex justify-center">
            <img
              src={inspectionImg}
              alt="Infrared Thermography Inspection Process"
              className="rounded-xl shadow-lg w-full max-w-2xl object-cover"
            />
          </section>

          {/* Safety */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Safety in Thermal Inspections
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Safety is critical during thermographic inspections, especially on live electrical systems. Written procedures ensure consistency and risk control.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              Relevant standards include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><span className="font-semibold">NFPA 70E</span> – Electrical safety and PPE requirements</li>
              <li><span className="font-semibold">OSHA 29 CFR 1910</span> – Electrical and workplace safety</li>
              <li><span className="font-semibold">ISO 6781</span> – Infrared methods for thermal anomaly detection</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              Technicians should always wear appropriate PPE and follow safe work practices.
            </p>
          </section>

          {/* Why Choose Voltify */}
          <section className="bg-white rounded-xl shadow-md p-8 border-l-4 border-electric-blue">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Why Choose Voltify Innovation for Infrared Thermography
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              At Voltify Innovation, infrared thermography is part of a comprehensive predictive maintenance strategy designed to improve reliability and reduce operational risk.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              Our services help clients:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Detect faults before failure</li>
              <li>Reduce unplanned downtime</li>
              <li>Extend equipment life</li>
              <li>Optimise maintenance costs</li>
              <li>Improve electrical and mechanical system safety</li>
            </ul>
            <p className="leading-relaxed text-gray-700 mt-4 font-semibold">
              With the right tools, expertise, and methodology, thermography becomes a powerful asset for long-term reliability.
            </p>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-dark-gray">FAQs</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">How often should thermography inspections be performed?</h3>
                <p className="text-gray-700">Typically quarterly or bi-annually depending on criticality; mission-critical systems may require monthly monitoring.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">Can thermography replace vibration analysis?</h3>
                <p className="text-gray-700">No; thermography and vibration analysis are complementary techniques that together provide comprehensive condition monitoring.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">What is emissivity in thermal imaging?</h3>
                <p className="text-gray-700">Emissivity is a material's ability to emit infrared radiation; accounting for it ensures accurate temperature readings.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">Can thermography be used indoors only?</h3>
                <p className="text-gray-700">Thermography can be used both indoors and outdoors; outdoor inspections require accounting for solar radiation and weather conditions.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">How is thermography data stored and analyzed?</h3>
                <p className="text-gray-700">Thermal images and data are stored in dedicated software platforms enabling trend analysis, historical comparison, and automated reporting.</p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p className="leading-relaxed opacity-90 mb-4">
              Applying infrared thermography to predictive maintenance transforms how facilities manage their assets. By identifying heat-related issues early, organisations can shift from reactive repairs to proactive reliability planning.
            </p>
            <p className="leading-relaxed opacity-90">
              With structured inspections and expert analysis from Voltify Innovation, thermography delivers measurable cost savings, improved safety, and uninterrupted operations.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Schedule Your Infrared Thermography Assessment
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Detect equipment faults early. Reduce downtime. Extend asset life.
            </p>
            <a
              href={`https://wa.me/919970189950?text=${encodeURIComponent("Hi! I'm interested in infrared thermography services for predictive maintenance. Can you provide more details?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-electric-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </section>

          {/* Related Blogs */}
          <RelatedBlogs currentBlogSlug="infrared-thermography" />
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-electric-blue hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19V5m0 0l-7 7m7-7l7 7"
            />
          </svg>
        </button>
      )}

      <Footer />
    </>
  );
};

export default InfraredThermography;
