import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedBlogs from "@/components/RelatedBlogs";

import heroImg from "@/assets/UPS-System-Maintenance.jpg";
import maintenanceImg from "@/assets/ups-maintenance.jpg";

const UPSMaintenance: React.FC = () => {
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
              The Importance of Preventive Maintenance for UPS Systems
            </h1>
            <p className="text-lg opacity-90">
              Maximize uptime, extend equipment life, and avoid costly emergency repairs
            </p>
            <p className="text-sm opacity-75 mt-4">Last Updated: January 28, 2026</p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-14">
          {/* Introduction */}
          <section id="backbone">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              The Backbone of Modern Operations
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Uninterruptible Power Supply (UPS) systems are the quiet backbone of modern operations. From data centres and hospitals to manufacturing plants and commercial facilities, UPS systems protect critical equipment from power disturbances and ensure uninterrupted operations. However, a UPS is only as reliable as the maintenance behind it.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              This is where preventive maintenance for UPS systems becomes essential.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              According to a study by the Ponemon Institute, the average cost of a single data centre outage is approximately <span className="font-semibold">$9,000 per minute globally (Ponemon, 2023)</span>. In India, the financial impact can be far greater when production losses, delayed services, and reputational damage are considered. A structured UPS preventive maintenance plan not only improves power backup reliability but also extends UPS lifespan and avoids costly emergency failures.
            </p>
            <p className="leading-relaxed text-gray-700 font-semibold text-electric-blue">
              With the right maintenance approach, organisations can minimise downtime risks, improve ROI, and maintain business continuity.
            </p>
          </section>

          {/* Hero Image */}
          <section className="flex justify-center">
            <img
              src={heroImg}
              alt="UPS System Maintenance"
              className="rounded-xl shadow-lg w-full max-w-2xl object-cover"
            />
          </section>

          {/* Why Preventive Maintenance Is Critical */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Why Preventive Maintenance Is Critical for UPS Systems
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              The importance of preventive maintenance in UPS systems cannot be overstated. Without regular servicing, businesses expose themselves to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Unplanned downtime disrupting operations</li>
              <li>Damage to IT, medical, or industrial equipment</li>
              <li>Expensive emergency repairs and replacements</li>
              <li>Reduced lifespan of batteries and power electronics</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              In simple terms, UPS preventive maintenance protects uptime, controls costs, and safeguards assets.
            </p>
          </section>

          {/* Best Practices & Checklist */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-dark-gray">
              UPS Preventive Maintenance Best Practices & Checklist
            </h2>

            <div className="space-y-6">
              {/* 1. Visual Inspections */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  1. Visual UPS Inspections (Weekly / Monthly)
                </h3>
                <p className="text-gray-700 mb-3">
                  Routine visual inspections help identify early warning signs such as:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Loose electrical connections</li>
                  <li>Corrosion or discoloration</li>
                  <li>Overheating components</li>
                  <li>Dust accumulation restricting airflow</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">
                  Early detection prevents small issues from turning into major failures.
                </p>
              </div>

              {/* 2. Battery Testing */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  2. UPS Battery Testing & Replacement Cycle
                </h3>
                <p className="text-gray-700 mb-3">
                  Batteries are the heart of any UPS system. Regular testing ensures weak cells are identified and replaced before they compromise backup performance.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-semibold">VRLA batteries:</span> Typical lifespan of 3–5 years</li>
                  <li><span className="font-semibold">Lithium-ion batteries:</span> Longer lifespan with proper monitoring</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">
                  Consistent battery health checks are critical to reliable backup power.
                </p>
              </div>

              {/* 3. Capacitor, Fan & Air Filter */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  3. Capacitor, Fan & Air Filter Maintenance
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
                  <li>Capacitors degrade due to heat and age and should be inspected annually and replaced every 5–7 years</li>
                  <li>Cooling fans and air filters prevent overheating; clogged filters or failed fans can cause sudden shutdowns</li>
                </ul>
                <p className="text-gray-700 font-semibold">
                  Ignoring these components is a common cause of UPS failure.
                </p>
              </div>

              {/* 4. Firmware & Software */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  4. Firmware & Software Updates
                </h3>
                <p className="text-gray-700">
                  Updating UPS firmware and monitoring software ensures access to the latest performance improvements, security patches, and fault diagnostics—often overlooked but essential for modern UPS systems.
                </p>
              </div>

              {/* 5. Load & Stress Testing */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  5. Load & Stress Testing
                </h3>
                <p className="text-gray-700">
                  Load testing simulates real power outage conditions to confirm that the UPS can support the connected load when required. This step is crucial for mission-critical applications.
                </p>
              </div>

              {/* 6. Environmental Controls */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  6. Environmental Controls: Temperature, Humidity & Dust
                </h3>
                <p className="text-gray-700 mb-3">
                  UPS performance is highly sensitive to its environment:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
                  <li>High temperatures drastically reduce battery life (IEEE, 2023)</li>
                  <li>Excess humidity leads to corrosion</li>
                  <li>Dust blocks ventilation and increases heat</li>
                </ul>
                <p className="text-gray-700 font-semibold">
                  Maintaining 20–25°C temperature and 40–60% relative humidity, along with proper ventilation, is strongly recommended.
                </p>
              </div>
            </div>
          </section>

          {/* Maintenance Image */}
          <section className="flex justify-center">
            <img
              src={maintenanceImg}
              alt="UPS Maintenance Procedures"
              className="rounded-xl shadow-lg w-full max-w-2xl object-cover"
            />
          </section>

          {/* Warning Signs */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Warning Signs Your UPS Needs Maintenance
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Knowing how to know if a UPS needs servicing can prevent catastrophic failures. Common warning signs include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Frequent alarms or error codes</li>
              <li>Bulging or swollen capacitors</li>
              <li>Excessive heat or unusual fan noise</li>
              <li>Reduced battery runtime despite full charge</li>
              <li>Burning smells or sparks near electrical connections</li>
            </ul>
            <p className="leading-relaxed text-gray-700 mt-4 font-semibold">
              Addressing these symptoms early avoids unexpected shutdowns and equipment damage.
            </p>
          </section>

          {/* Maintenance Schedule Table */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-dark-gray">
              Recommended UPS Maintenance Schedule
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <thead className="bg-electric-blue text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Task</th>
                    <th className="px-6 py-3 text-left">Frequency</th>
                    <th className="px-6 py-3 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-3 font-semibold">Visual inspection</td>
                    <td className="px-6 py-3">Weekly / Monthly</td>
                    <td className="px-6 py-3">Check for dust, corrosion, overheating</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold">Battery health testing</td>
                    <td className="px-6 py-3">Quarterly</td>
                    <td className="px-6 py-3">Replace weak batteries proactively</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold">Capacitor & fan inspection</td>
                    <td className="px-6 py-3">Annually</td>
                    <td className="px-6 py-3">Capacitor replacement every 5–7 years</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold">Firmware/software updates</td>
                    <td className="px-6 py-3">As needed</td>
                    <td className="px-6 py-3">Maintain system security & performance</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold">Load testing</td>
                    <td className="px-6 py-3">Annually</td>
                    <td className="px-6 py-3">Simulate outage conditions</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold">Environmental checks</td>
                    <td className="px-6 py-3">Ongoing</td>
                    <td className="px-6 py-3">Clean, cool, dry UPS room</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed text-gray-700 mt-6 p-4 bg-blue-50 rounded-lg">
              <span className="font-semibold">Service Frequency Recommendations:</span><br/>
              Standard facilities: At least twice a year<br/>
              Mission-critical sites (data centres, hospitals): Quarterly or more frequently
            </p>
          </section>

          {/* Cost Savings */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Cost Savings: UPS Preventive Maintenance vs Downtime
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              One of the biggest UPS preventive maintenance benefits is cost control.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-electric-blue">
                <div className="text-3xl font-bold text-electric-blue mb-2">~$9K/min</div>
                <p className="text-gray-700 text-sm">Downtime cost (global average)</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-electric-blue">
                <div className="text-3xl font-bold text-electric-blue mb-2">2-3x</div>
                <p className="text-gray-700 text-sm">Cost multiplier for emergency repairs</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-electric-blue">
                <div className="text-3xl font-bold text-electric-blue mb-2">Predictable</div>
                <p className="text-gray-700 text-sm">Preventive AMC costs</p>
              </div>
            </div>
            <p className="leading-relaxed text-gray-700 font-semibold">
              Preventive maintenance consistently proves more economical than reactive repairs.
            </p>
          </section>

          {/* Predictive Maintenance */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Predictive & Condition-Based UPS Maintenance
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              While preventive maintenance follows a schedule, condition-based UPS maintenance uses real-time data to go a step further.
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">Key Technologies</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><span className="font-semibold">Battery Health Monitoring Systems (BHMS):</span> Track battery degradation and optimise replacement timing</li>
                  <li><span className="font-semibold">Remote Monitoring Systems:</span> Provide real-time alerts for faults, load issues, and environmental risks</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">Role of IoT & AI in UPS Maintenance</h3>
                <p className="text-gray-700 mb-3">IoT-enabled UPS systems continuously transmit operational data. AI-driven analytics then:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Predict battery end-of-life accurately</li>
                  <li>Analyse load trends for optimisation</li>
                  <li>Correlate alarms with cooling or grid conditions</li>
                  <li>Recommend precise maintenance windows</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">
                  This approach reduces surprise failures, extends asset life, and maximises ROI.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Common UPS Maintenance Mistakes to Avoid
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Many failures occur due to avoidable mistakes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Skipping load and stress tests</li>
              <li>Ignoring capacitor and fan health</li>
              <li>Poor ventilation and dust control</li>
              <li>Delayed firmware updates</li>
              <li>Using unqualified service providers</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              Avoiding these errors significantly improves UPS reliability.
            </p>
          </section>

          {/* Why Choose Voltify */}
          <section className="bg-white rounded-xl shadow-md p-8 border-l-4 border-electric-blue">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Why Choose Voltify Innovation for UPS Preventive Maintenance
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Preventive maintenance is only effective when backed by the right expertise. Voltify Innovation delivers reliable and structured UPS preventive maintenance solutions designed for real-world conditions.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              With Voltify Innovation, you benefit from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Experienced engineers trained in detailed UPS inspections and diagnostics</li>
              <li>Preventive maintenance programs tailored to industrial, commercial, and critical facilities</li>
              <li>Battery health assessment and monitoring solutions</li>
              <li>Power quality and environmental evaluation</li>
              <li>Flexible maintenance plans aligned with your operational needs</li>
            </ul>
            <p className="leading-relaxed text-gray-700 mt-4 font-semibold">
              Our focus is simple: maximum uptime, extended equipment life, and reduced operational risk.
            </p>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-dark-gray">FAQs</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">How often should UPS batteries be replaced?</h3>
                <p className="text-gray-700">Typically every 3–5 years for VRLA batteries; longer for lithium-ion with monitoring.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">What's the difference between preventive and corrective maintenance?</h3>
                <p className="text-gray-700">Preventive maintenance is planned servicing; corrective maintenance occurs after a failure.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">Can UPS maintenance be done without downtime?</h3>
                <p className="text-gray-700">Many inspections can be performed live; major interventions may require scheduled downtime.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">Can UPS maintenance extend battery life?</h3>
                <p className="text-gray-700">Yes, by controlling temperature, avoiding overloads, and testing batteries regularly.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-dark-gray mb-2">What is condition-based UPS maintenance?</h3>
                <p className="text-gray-700">Maintenance driven by real-time monitoring rather than fixed service intervals.</p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
            <p className="leading-relaxed opacity-90 mb-4">
              The importance of preventive maintenance for UPS systems cannot be ignored. A proactive approach combining scheduled inspections, predictive monitoring, and environmental control ensures uninterrupted operations and long-term cost savings.
            </p>
            <p className="leading-relaxed opacity-90">
              With Voltify Innovation's UPS preventive maintenance expertise, your power backup systems remain reliable, efficient, and ready when you need them most.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Schedule Your UPS Maintenance Assessment
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Reduce downtime. Protect your assets. Strengthen your power reliability.
            </p>
            <a
              href={`https://wa.me/919970189950?text=${encodeURIComponent("Hi! I would like to schedule a UPS preventive maintenance assessment for my facility. Can you provide more details?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-electric-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </section>

          {/* Related Blogs */}
          <RelatedBlogs currentBlogSlug="ups-preventive-maintenance" />
        </div>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-electric-blue hover:bg-dark-gray text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default UPSMaintenance;
