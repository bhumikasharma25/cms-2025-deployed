import { Link } from "react-router-dom";
import type { Post } from "../../data/posts";

const labelClass = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

export default function BlogCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <Link
        to={`/blog/${post.slug}`}
        className="thumb"
        aria-label={post.title}
        tabIndex={-1}
      >
        <img
          src={`https://picsum.photos/seed/${post.imageSeed}/640/400`}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </Link>
      <div className="post-body">
        <span className={`post-label ${labelClass(post.label)}`}>
          {post.label}
        </span>
        <h3 className="post-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-footer">
          <span
            className="avatar avatar-sm"
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
        </div>
        <Link className="card-read-more" to={`/blog/${post.slug}`}>
          Read More →
        </Link>
      </div>
    </article>
  );
}
