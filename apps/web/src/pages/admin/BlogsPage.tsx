import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  label: string;
  category: string;
  date: string;
  slug: string;
  author: {
    name: string;
    initials: string;
    color: string;
  };
}

const BlogListing = ({
  posts,
  onAdd,
  onEdit,
  onDelete,
}: {
  posts: Post[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", width: "100%" }}>
      <header style={{
        marginBottom: "24px",
        paddingBottom: "16px",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#1e293b", marginBottom: "8px" }}>Blogs</h1>
        <input
          style={{
            padding: "12px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            fontFamily: "inherit",
            fontSize: "14px",
            width: "300px",
            marginRight: "16px",
          }}
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button style={{
          background: "#3b82f6",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          fontSize: "14px",
          cursor: "pointer"
        }}
        onClick={() => onAdd()}>
          Add Blog
        </button>
      </header>

      {filteredPosts.length === 0 ? (
        <div style={{
          padding: "32px",
          textAlign: "center",
          color: "#64748b"
        }}>
          <h3>No blogs found</h3>
          <p>Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "16px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{
                    background: post.author.color,
                    color: "white",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    borderRadius: "999px",
                    marginBottom: "8px",
                    display: "inline-block"
                  }}>
                    {post.label}
                  </span>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>{post.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "12px" }}>{post.excerpt}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>{post.date}</span>
                  <div style={{ marginTop: "8px" }}>
                    <button
                      style={{
                        marginRight: "4px",
                        background: "transparent",
                        border: "none",
                        color: "#3b82f6",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                      onClick={() => onEdit(post.id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                      onClick={() => onDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BlogsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - will be replaced with API calls later
    setPosts([
      {
        id: "1",
        title: "The Future of Web Development in 2025: Headless, Edge-First, and Generative",
        excerpt:
          "Start learning how modern platforms ship faster with decoupled backends and edge rendering.",
        label: "Technology",
        category: "Technology",
        date: "Sep 28, 2025",
        slug: "future-of-web-development-2025",
        author: {
          name: "Alex Thorne",
          initials: "AT",
          color: "#8b2151",
        },
      },
      {
        id: "2",
        title: "Mastering TypeScript: Advanced Generic Types",
        excerpt:
          "Unlock type-safety patterns that scale natively with your complex corporate library APIs.",
        label: "TypeScript",
        category: "Development",
        date: "Sep 25, 2025",
        slug: "mastering-typescript-generics",
        author: {
          name: "Elena Rostova",
          initials: "ER",
          color: "#4338ca",
        },
      },
      {
        id: "3",
        title: "Designing for Devs: Dark Mode Best Practices",
        excerpt:
          "Ensure contrast accessibility ratios conform elegantly with standard developer environments.",
        label: "UI Design",
        category: "Design",
        date: "Sep 24, 2025",
        slug: "dark-mode-best-practices",
        author: {
          name: "Alex Thorne",
          initials: "AT",
          color: "#0e7490",
        },
      },
    ]);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/blogs/${id}/edit`);
  };

  const handleAdd = () => {
    navigate("/admin/blogs/create");
  };

  return (
    <AdminLayout>
      <BlogListing
        posts={posts}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
};

export default BlogsPage;