import { Link } from "react-router-dom";
import type { Post } from "../../data/posts";

export default function FeaturedHero({ post }: { post: Post }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-card">
          <img
            className="hero-img"
            src={`https://picsum.photos/seed/${post.imageSeed}/1400/700`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="hero-content">
            <span className="badge">{post.label}</span>
            <h1 className="hero-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h1>
            <div className="meta-row">
              <span
                className="avatar avatar-lg"
                style={{ background: post.author.color }}
                aria-hidden="true"
              >
                {post.author.initials}
              </span>
              <span className="meta-name">{post.author.name}</span>
              <span className="meta-dot" aria-hidden="true">
                •
              </span>
              <span className="meta-date">{post.date}</span>
              <span className="meta-dot" aria-hidden="true">
                •
              </span>
              <Link className="read-more" to={`/blog/${post.slug}`}>
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
