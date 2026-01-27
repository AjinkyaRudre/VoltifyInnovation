import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedBlogs from "@/components/RelatedBlogs";

import heroImg from "@/assets/Active_Harmonic_Filters.png";
import workingPrincipleImg from "@/assets/Working-principle-of-active-harmonic-filter.png";
import caseImg from "@/assets/power-quality-1.png";

const ActiveHarmonicFilters: React.FC = () => {
  return (
    <>
      {/* Global Header & Navbar */}
      <Header />
      <Navigation />

      <main className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Active Harmonic Filters
            </h1>
            <p className="text-lg opacity-90">
              Improve equipment reliability and reduce energy losses
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-14">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              The Power Quality Challenge
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Electrical systems today power more non-linear loads than ever
              before. While these loads improve efficiency, they also introduce
              harmonic distortion into the network. If left unaddressed,
              harmonics can quietly damage equipment, reduce system efficiency,
              and increase operating costs.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              Active Harmonic Filters (AHFs) are designed to solve these
              problems by cleaning up the electrical supply and restoring stable
              power conditions.
            </p>
            <p className="leading-relaxed text-gray-700 font-semibold text-electric-blue">
              Simply put—cleaner power means better performance and longer
              equipment life.
            </p>
          </section>

          {/* Hero Image */}
          <section className="flex justify-center">
            <img
              src={heroImg}
              alt="Active Harmonic Filter System"
              className="rounded-xl shadow-lg w-full max-w-2xl object-cover"
            />
          </section>

          {/* Are Harmonics Affecting Your System */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Are Harmonics Affecting Your Electrical System?
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Harmonic issues often go unnoticed until they start causing
              serious problems. Your system may be affected if you're
              experiencing:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Overheating in cables, transformers, panels, or generators</li>
              <li>Unexplained high voltages or circulating currents</li>
              <li>Frequent equipment malfunctions or control failures</li>
              <li>Reduced lifespan of electrical components</li>
              <li>Nuisance tripping of breakers and protection devices</li>
              <li>Inaccurate energy metering</li>
              <li>Overheating or fires in wiring systems</li>
              <li>Generator instability or failures</li>
              <li>Poor power factor and related utility penalties</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              If any of these sound familiar, harmonic distortion is likely a
              contributing factor.
            </p>
          </section>

          {/* Understanding Harmonics */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Understanding Harmonics
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Harmonics are distortions in voltage and current waveforms caused
              by non-linear loads such as variable frequency drives, UPS
              systems, LED lighting, and modern electronic power supplies.
            </p>
            <p className="leading-relaxed text-gray-700 mb-4">
              These loads draw current in short, uneven pulses instead of a
              smooth sinusoidal pattern. This distortion—measured as Total
              Harmonic Distortion (THD)—travels through the electrical network
              and affects other connected equipment.
            </p>
            <p className="leading-relaxed text-gray-700">
              As harmonic levels increase, so does the risk of overheating,
              instability, and unexpected failures.
            </p>
          </section>

          {/* Why Harmonics Are a Problem */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Why Harmonics Are a Problem
            </h2>
            <p className="leading-relaxed text-gray-700 mb-6">
              Harmonics can be difficult to detect and are often mistaken for
              equipment faults. Over time, they can seriously impact both
              electrical performance and daily operations.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Electrical Effects */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-electric-blue">
                  Electrical Effects
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Increased harmonic current levels</li>
                  <li>Breaker and RCD nuisance tripping</li>
                  <li>Transformer overheating</li>
                  <li>Reduced efficiency of motors and UPS systems</li>
                  <li>Excessive heating in cables and switchboards</li>
                  <li>Failure to meet power quality standards</li>
                </ul>
              </div>

              {/* Operational Impact */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-electric-blue">
                  Operational Impact
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Unplanned downtime and power interruptions</li>
                  <li>Early failure of motors and transformers</li>
                  <li>Higher maintenance and replacement costs</li>
                  <li>
                    Expensive upgrades to compensate for degraded performance
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Solution */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              The Solution: Active Harmonic Filters
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              Active Harmonic Filters provide a reliable and flexible way to
              control harmonic distortion. They continuously monitor the
              electrical system and inject corrective currents in real time to
              cancel out unwanted harmonics.
            </p>
            <p className="leading-relaxed text-gray-700 font-semibold text-electric-blue">
              Unlike traditional solutions, AHFs adapt instantly to changing
              load conditions.
            </p>
          </section>

          {/* How Active Harmonic Filters Work */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              How Active Harmonic Filters Work
            </h2>
            <p className="leading-relaxed text-gray-700 mb-6">
              AHFs analyse the electrical network in real time and actively
              remove both low- and high-order harmonics. In addition to harmonic
              mitigation, they also help manage:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Reactive power</li>
              <li>Phase imbalance</li>
              <li>Neutral current overload</li>
            </ul>
            <p className="leading-relaxed text-gray-700 font-semibold">
              The result is a cleaner, more stable power supply across the
              entire system.
            </p>
          </section>

          {/* Working Principle Image */}
          <section className="flex justify-center">
            <img
              src={workingPrincipleImg}
              alt="Working Principle of Active Harmonic Filter"
              className="rounded-xl shadow-lg w-full max-w-2xl object-cover"
            />
          </section>

          {/* Key Benefits */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-dark-gray">
              Key Benefits of Active Harmonic Filters
            </h2>

            <div className="space-y-6">
              {/* Effective Harmonic Mitigation */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  Effective Harmonic Mitigation
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Simultaneous filtering of multiple harmonic orders</li>
                  <li>Selective filtering up to high harmonic levels</li>
                </ul>
              </div>

              {/* Reactive Power Compensation */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  Reactive Power Compensation
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    Smooth, step-less compensation for inductive and capacitive
                    loads
                  </li>
                  <li>Adjustable target power factor</li>
                  <li>
                    Eliminates over-compensation risks associated with capacitor
                    banks
                  </li>
                  <li>Well suited for generator-based systems</li>
                </ul>
              </div>

              {/* Load Balancing */}
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-electric-blue">
                <h3 className="text-xl font-bold mb-3 text-dark-gray">
                  Load Balancing
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Suitable for both 3-wire and 4-wire systems</li>
                  <li>Balances phase and neutral currents</li>
                  <li>Reduces voltage imbalance</li>
                  <li>Improves safety and performance of sensitive equipment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-white rounded-xl shadow-md p-8 border-l-4 border-electric-blue">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Cleaner Power. Stronger Systems.
            </h2>
            <p className="leading-relaxed text-gray-700 mb-4">
              By improving power quality, Active Harmonic Filters help protect
              critical equipment, extend asset life, and lower long-term
              operating costs.
            </p>
            <p className="leading-relaxed text-gray-700">
              If harmonic distortion is affecting your facility, addressing it
              early can prevent costly failures and disruptions.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Improve Your Power Quality?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Contact Voltify Innovation for a comprehensive assessment of your
              electrical system and discover how Active Harmonic Filters can
              benefit your facility.
            </p>
            <a
              href={`https://wa.me/919970189950?text=${encodeURIComponent("Hi! I'm interested in learning more about Active Harmonic Filters. Can you help me improve my power quality?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-electric-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </section>

          {/* Related Blogs */}
          <RelatedBlogs currentBlogSlug="active-harmonic-filters" />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ActiveHarmonicFilters;
