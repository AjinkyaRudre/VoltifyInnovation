import React from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { getAllBlogs } from "@/data/blogs";

import powerQualityImg from "@/assets/power-quality-1.png";
import ahfImg from "@/assets/Active_Harmonic_Filters.png";
import upsImg from "@/assets/UPS-System-Maintenance.jpg";
import irImg from "@/assets/Infrared-thermography/Infrared-Thermography-1.png";

const BlogHub: React.FC = () => {
  const blogPosts = getAllBlogs();
  
  // Map image paths
  const imageMap: Record<string, string> = {
    "power-quality-1.png": powerQualityImg,
    "Active_Harmonic_Filters.png": ahfImg,
    "UPS-System-Maintenance.jpg": upsImg,
    "Infrared-thermography/Infrared-Thermography-1.png": irImg,
  };

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
              Voltify Innovation Blog
            </h1>
            <p className="text-lg opacity-90">
              Expert insights on power quality, electrical efficiency, and
              system optimization
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
              >
                <img
                  src={imageMap[post.image] || "/placeholder.png"}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <span className="text-sm font-semibold text-electric-blue bg-blue-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-dark-gray mb-3 hover:text-electric-blue transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-block text-electric-blue font-semibold hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Resources Section */}
        <section className="bg-white py-14">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-dark-gray mb-8 text-center">
              Why Power Quality Matters
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-electric-blue mb-3">
                  30%
                </div>
                <p className="text-gray-700">
                  Average energy loss due to poor power quality and harmonics
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-electric-blue mb-3">
                  50%+
                </div>
                <p className="text-gray-700">
                  Increase in equipment lifespan with proper power conditioning
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-electric-blue mb-3">
                  15-25%
                </div>
                <p className="text-gray-700">
                  Typical reduction in electricity bills after optimization
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Expert Power Quality Advice?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Voltify Innovation offers comprehensive assessments and solutions
              for all your electrical system challenges.
            </p>
            <a
              href="/#contact"
              className="inline-block bg-white text-electric-blue font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Contact Us Today
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default BlogHub;
