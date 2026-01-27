# Blog & Case Study Management Guide

This guide explains how to easily add new blogs and case studies to the Voltify Innovation website.

## Current Structure

The blog system is now centralized and scalable with the following components:

### 1. **Blog Data Configuration** (`src/data/blogs.ts`)
   - Central configuration file for all blog posts
   - Contains all blog metadata and links
   - Easy to update and maintain

### 2. **Blog Hub** (`src/pages/BlogHub.tsx`)
   - Main blog index page at `/blog`
   - Dynamically displays all blogs from the data file
   - No need to edit this file when adding new blogs

### 3. **Related Blogs Component** (`src/components/RelatedBlogs.tsx`)
   - Reusable component to show related blogs
   - Automatically pulls related content based on current blog slug
   - Used in all individual blog pages

### 4. **Individual Blog Pages**
   - `src/pages/BlogCaseStudy.tsx` - Power Factor & Harmonics Study
   - `src/pages/ActiveHarmonicFilters.tsx` - Active Harmonic Filters
   - Each page imports RelatedBlogs component with its slug

### 5. **Routing** (`src/App.tsx`)
   - `/blog` - Blog hub (displays all blogs)
   - `/blog/:slug` - Individual blog pages

---

## How to Add a New Blog

### Step 1: Create the Blog Page Component

Create a new file in `src/pages/` (e.g., `src/pages/YourBlogTitle.tsx`):

```tsx
import React from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedBlogs from "@/components/RelatedBlogs";

import heroImg from "@/assets/your-image.png";

const YourBlogTitle: React.FC = () => {
  return (
    <>
      <Header />
      <Navigation />

      <main className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-dark-gray to-electric-blue text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Blog Title
            </h1>
            <p className="text-lg opacity-90">
              Your blog subtitle or description
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-14 space-y-14">
          {/* Add your content sections here */}
          
          {/* Related Blogs - Always include this at the end */}
          <RelatedBlogs currentBlogSlug="your-blog-slug" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default YourBlogTitle;
```

### Step 2: Add Blog Image

1. Place your blog image in `src/assets/`
2. Note the filename (e.g., `your-image.png`)

### Step 3: Update Blog Data

Edit `src/data/blogs.ts` and add your blog to the `BLOG_POSTS` array:

```typescript
{
  id: "3",                              // Next available ID
  title: "Your Blog Title",             // Display title
  excerpt: "Brief description...",      // Short description for blog hub
  slug: "your-blog-slug",               // URL slug (used in routes)
  category: "Category Name",            // Blog category
  date: "2024",                         // Publication year
  image: "your-image.png",              // Image filename from src/assets/
  component: "YourBlogTitle",           // Component name
},
```

### Step 4: Update Routing

Edit `src/App.tsx` and add the import and route:

```tsx
import YourBlogTitle from "./pages/YourBlogTitle";

// In the Routes section:
<Route path="/blog/your-blog-slug" element={<YourBlogTitle />} />
```

---

## Blog Post Metadata Explanation

- **id**: Unique identifier (use sequential numbers: "3", "4", etc.)
- **title**: Full blog post title (appears on blog hub and page)
- **excerpt**: Brief description (shown on blog hub card) - keep to 1-2 sentences
- **slug**: URL-friendly identifier (lowercase, hyphens, no spaces)
  - Format: `/blog/your-blog-slug`
- **category**: Blog category (e.g., "Case Study", "Technical Guide", "Tutorial")
- **date**: Publication date or year
- **image**: Filename of the featured image in `src/assets/`
- **component**: Name of the React component file (without .tsx)

---

## File Structure Reference

```
src/
├── data/
│   └── blogs.ts              ← Edit this to add new blogs
├── components/
│   └── RelatedBlogs.tsx       ← Used in all blog pages
├── pages/
│   ├── BlogHub.tsx            ← Blog index (auto-updates)
│   ├── BlogCaseStudy.tsx      ← Existing blog
│   ├── ActiveHarmonicFilters.tsx ← Existing blog
│   └── YourNewBlog.tsx        ← Create new blogs here
└── assets/
    └── your-image.png         ← Add images here
```

---

## Example: Adding a Third Blog

### 1. Create `src/pages/PowerQualityGuide.tsx`
Create the component file with your content.

### 2. Add image to `src/assets/power-quality-guide.png`

### 3. Update `src/data/blogs.ts`:
```typescript
{
  id: "3",
  title: "Complete Guide to Power Quality",
  excerpt: "Everything you need to know about maintaining optimal power quality in your facility.",
  slug: "power-quality-guide",
  category: "Guide",
  date: "2024",
  image: "power-quality-guide.png",
  component: "PowerQualityGuide",
},
```

### 4. Update `src/App.tsx`:
```tsx
import PowerQualityGuide from "./pages/PowerQualityGuide";

// In Routes:
<Route path="/blog/power-quality-guide" element={<PowerQualityGuide />} />
```

That's it! The new blog will automatically:
- Appear on the blog hub at `/blog`
- Show related blogs at the bottom
- Be included in the "Read More" sections of other blogs

---

## Key Benefits

✅ **Centralized Management** - All blog info in one file
✅ **Easy Scaling** - Add new blogs without modifying existing components
✅ **Automatic Relationships** - Related blogs automatically populate
✅ **Consistent Structure** - All blogs follow the same pattern
✅ **SEO-Friendly** - Clean URL slugs and proper metadata
✅ **Maintainable** - Quick to find and update blog information

---

## Tips

- Keep blog excerpts concise (100-150 characters)
- Use descriptive image filenames
- Keep slugs lowercase and use hyphens (no spaces or underscores)
- Always include the `<RelatedBlogs currentBlogSlug="your-slug" />` component at the end
- Image filenames must match exactly (case-sensitive on some systems)
