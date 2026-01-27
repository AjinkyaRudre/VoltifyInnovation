export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  component: string; // Name of the component file
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Power Factor & Harmonics Study",
    excerpt:
      "Learn how detailed Power Factor and Harmonics Studies help improve system efficiency, reduce energy costs, and ensure long-term reliability.",
    slug: "power-factor-harmonics",
    category: "Case Study",
    date: "January 2026",
    image: "power-quality-1.png",
    component: "BlogCaseStudy",
  },
  {
    id: "2",
    title: "Active Harmonic Filters",
    excerpt:
      "Discover how Active Harmonic Filters clean up electrical supply, improve equipment reliability, and reduce energy losses by removing harmonic distortion.",
    slug: "active-harmonic-filters",
    category: "Technical Guide",
    date: "January 2026",
    image: "Active_Harmonic_Filters.png",
    component: "ActiveHarmonicFilters",
  },
  // Add new blogs here following the same structure
  // {
  //   id: "3",
  //   title: "Your New Blog Title",
  //   excerpt: "Brief description...",
  //   slug: "your-blog-slug",
  //   category: "Category Name",
  //   date: "2024",
  //   image: "image-filename.png",
  //   component: "YourComponentName",
  // },
];

/**
 * Get all blog posts
 */
export const getAllBlogs = (): BlogPost[] => {
  return BLOG_POSTS;
};

/**
 * Get a single blog post by slug
 */
export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS.find((blog) => blog.slug === slug);
};

/**
 * Get related blogs (all blogs except the current one)
 */
export const getRelatedBlogs = (currentSlug: string): BlogPost[] => {
  return BLOG_POSTS.filter((blog) => blog.slug !== currentSlug);
};

/**
 * Get blog by ID
 */
export const getBlogById = (id: string): BlogPost | undefined => {
  return BLOG_POSTS.find((blog) => blog.id === id);
};
