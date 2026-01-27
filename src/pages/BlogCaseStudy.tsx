import React from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedBlogs from "@/components/RelatedBlogs";

import caseImg1 from "@/assets/power-quality-1.png";
import caseImg2 from "@/assets/power-quality-2.png";
import ahfImg from "@/assets/Active_Harmonic_Filters.png";

const BlogCaseStudy: React.FC = () => {
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
              Power Factor & Harmonics Study
            </h1>
            <p className="text-lg opacity-90">
              Case Study by{" "}
              <span className="font-semibold text-white">
                Voltify Innovation
              </span>
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-14">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Overview
            </h2>
            <p className="leading-relaxed text-gray-700">
              In today’s electrical installations, managing power factor and
              harmonics is no longer optional—it is essential. Poor power factor
              directly affects system efficiency, increases energy losses,
              causes voltage drops, and results in higher electricity bills.
              With utilities now following kVAh-based billing, even small
              deviations can create a significant cost impact.
            </p>
            <p className="leading-relaxed text-gray-700 mt-4">
              Voltify Innovation helps industries and commercial facilities
              improve energy efficiency through detailed Power Factor and
              Harmonics Studies, ensuring safe operation, lower energy costs,
              and long-term reliability.
            </p>
          </section>

          {/* Images */}
          <section className="grid md:grid-cols-2 gap-6">
            <img
              src={caseImg1}
              alt="Power Quality Measurement"
              className="rounded-xl shadow-lg object-cover"
            />
            <img
              src={caseImg2}
              alt="Harmonic Analysis Report"
              className="rounded-xl shadow-lg object-cover"
            />
          </section>

          {/* Challenges */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Challenges Faced
            </h2>
            <p className="leading-relaxed text-gray-700">
              Modern electrical systems use non-linear and fast-changing loads
              such as VFDs, UPS systems, IT equipment, LED lighting, and
              automation panels. These loads generate harmonics that distort
              current and voltage waveforms, leading to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>High THD-I and THD-V levels</li>
              <li>Overheating of transformers, cables, and switchgear</li>
              <li>Frequent tripping and equipment malfunction</li>
              <li>Reduced equipment life and poor power quality</li>
            </ul>
            <p className="leading-relaxed text-gray-700 mt-4">
              In many installations, capacitor banks are installed without
              studying the network. In harmonic-rich systems, this can create
              resonance conditions, leading to repeated failures and equipment
              damage.
            </p>
          </section>

          {/* Study Approach */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Our Study Approach
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>On-site power quality measurements using advanced analyzers</li>
              <li>Monitoring power factor, load variation, and harmonic levels</li>
              <li>Capacitor bank ON/OFF behavior analysis</li>
              <li>SLD, transformer, and DG rating evaluation</li>
              <li>System impedance, fault level & future expansion study</li>
            </ul>
            <p className="leading-relaxed text-gray-700 mt-4">
              All collected data is simulated using specialized software to
              understand actual network behavior and identify resonance risks.
            </p>
          </section>

          {/* Solutions */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Solution Design & Recommendations
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Correct sizing of power factor correction systems</li>
              <li>Identification of optimal installation location</li>
              <li>Real-Time Power Factor Control (RTPFC) panels</li>
              <li>Detuned / Passive Tuned Harmonic Filter Banks</li>
              <li>Hybrid solutions with Active Harmonic Filters</li>
              <li>SVG / STATCOM systems for dynamic loads</li>
            </ul>
          </section>

          {/* Results */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Results & Benefits
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Stable and optimized power factor</li>
              <li>Reduced kVAh consumption and electricity bills</li>
              <li>Harmonic distortion within permissible limits</li>
              <li>Elimination of resonance-related failures</li>
              <li>Improved system reliability and equipment life</li>
            </ul>
          </section>

          {/* Conclusion */}
          <section className="bg-white rounded-xl shadow-md p-8 border-l-4 border-electric-blue">
            <h2 className="text-2xl font-bold mb-4 text-dark-gray">
              Conclusion
            </h2>
            <p className="leading-relaxed text-gray-700">
              Installing a capacitor bank without understanding system
              harmonics can do more harm than good. At Voltify Innovation,
              every power factor correction solution is backed by a detailed
              Power Factor and Harmonics Study, ensuring energy efficiency,
              compliance, and long-term operational safety.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Optimize Your Power Factor?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Contact Voltify Innovation to schedule your comprehensive Power Factor and Harmonics Study today.
            </p>
            <a
              href={`https://wa.me/919970189950?text=${encodeURIComponent("Hi! I would like to schedule a Power Factor and Harmonics Study for my facility. Can you provide more details?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-electric-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </section>

          {/* Related Blogs */}
          <RelatedBlogs currentBlogSlug="power-factor-harmonics" />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default BlogCaseStudy;
