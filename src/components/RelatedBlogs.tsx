import React from "react";
import { Link } from "react-router-dom";
import { getRelatedBlogs } from "@/data/blogs";

interface RelatedBlogsProps {
  currentBlogSlug: string;
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ currentBlogSlug }) => {
  const relatedBlogs = getRelatedBlogs(currentBlogSlug);

  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-dark-gray">Read More</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {relatedBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.slug}`}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
          >
            <img
              src={new URL(`/src/assets/${blog.image}`, import.meta.url).href}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-dark-gray mb-2 hover:text-electric-blue transition">
                {blog.title}
              </h3>
              <p className="text-gray-700 text-sm">
                {blog.excerpt}
              </p>
              <span className="inline-block text-electric-blue font-semibold hover:underline mt-4">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
