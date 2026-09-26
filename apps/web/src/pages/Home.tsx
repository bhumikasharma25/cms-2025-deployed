import { useEffect, useState } from "react";
import Navbar from "../components/public/Navbar";
import FeaturedHero from "../components/public/FeaturedHero";
import BlogCard from "../components/public/BlogCard";
import NewsletterSection from "../components/public/NewsletterSection";
import Footer from "../components/public/Footer";
import { categories, featuredPost, posts } from "../data/posts";

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState<string[]>([]);

  const q = query.trim().toLowerCase();

  const filtered = posts.filter((post) => {
    const matchesQuery =
      !q ||
      [post.title, post.description, post.category, ...post.tags].some((field) =>
        field.toLowerCase().includes(q)
      );
    const matchesCategory =
      activeCats.length === 0 || activeCats.includes(post.category);
    return matchesQuery && matchesCategory;
  });

  useEffect(() => {
    if (q) {
      document
        .getElementById("latest-posts")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [q]);

  const toggleCategory = (category: string) =>
    setActiveCats((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );

  return (
    <>
      <Navbar query={query} onQueryChange={setQuery} />
      <FeaturedHero post={featuredPost} />

      <section className="section" id="latest-posts">
        <div className="container">
          <h2 className="section-title">Latest Posts</h2>
          {filtered.length > 0 ? (
            <div className="posts-grid">
              {filtered.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No blogs found.</h3>
              <p>Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <div className="chips">
            {categories.map((category) => (
              <button
                key={category}
                className={`chip${
                  activeCats.includes(category) ? " active" : ""
                }`}
                onClick={() => toggleCategory(category)}
                aria-pressed={activeCats.includes(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </>
  );
}
