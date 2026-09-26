import { useState } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    content: "",
    thumbnail: "",
    category: "Technology",
    tags: [] as string[],
    status: "draft" as "draft" | "published",
  });

  const categories = [
    { value: "Technology", label: "Technology" },
    { value: "Design", label: "Design" },
    { value: "Development", label: "Development" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Business", label: "Business" },
    { value: "AI & ML", label: "AI & ML" },
    { value: "DevOps", label: "DevOps" },
    { value: "Product", label: "Product" },
  ];

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTagAdd = (tag: string) => {
    if (!tag.trim() || form.tags.includes(tag)) return;
    setForm({ ...form, tags: [...form.tags, tag.trim()] });
  };

  const handleTagRemove = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = () => {
    setForm({
      title: "",
      shortDescription: "",
      content: "",
      thumbnail: "",
      category: "Technology",
      tags: [] as string[],
      status: "draft",
    });
    navigate("/admin/blogs");
    alert("Blog saved successfully!");
  };

  return (
    <AdminLayout>
        <div style={{ padding: "24px", maxWidth: "1200px", width: "100%" }}>
          <h2 style={{ color: "#1e293b", marginBottom: "24px" }}>Create New Blog</h2>
          <form
            style={{ maxWidth: "800px" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                Title
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
                name="title"
                placeholder="Enter blog title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                Short Description
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
                name="shortDescription"
                placeholder="Enter a brief description"
                value={form.shortDescription}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                Content
              </label>
              <textarea
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  resize: "vertical",
                  minHeight: "200px",
                  marginBottom: "16px",
                }}
                name="content"
                placeholder="Write your blog content here..."
                value={form.content}
                onChange={handleChange}
              ></textarea>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                Thumbnail URL
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
                name="thumbnail"
                placeholder="https://picsum.photos/seed/..."
                value={form.thumbnail}
                onChange={handleChange}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                Category
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="AI & ML">AI & ML</option>
                <option value="DevOps">DevOps</option>
                <option value="Product">Product</option>
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                Tags
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {categories.map((cat) => {
                  const isSelected = form.tags.some((t) => t.includes(cat.value));
                  return (
                    <span
                      key={cat.value}
                      style={{
                        background: isSelected ? "#3b82f6" : "#e5e7eb",
                        color: isSelected ? "white" : "#374151",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        marginRight: "4px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {cat.label}
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#64748b",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleTagRemove(cat.label)}
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
                <input
                  style={{
                    flex: "1",
                    minWidth: "150px",
                    padding: "6px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "13px",
                  }}
                  placeholder="Add tags..."
                  onChange={(e) => handleTagAdd(e.target.value)}
                />
              </div>
              <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
                Separate tags with commas
              </p>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={{ display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>
                Status
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                }}
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as "draft" | "published",
                  })
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <button
                type="button"
                style={{
                  background: "transparent",
                  border: "1px solid #64748b",
                  color: "#64748b",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/admin/blogs")}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {form.status === "draft" ? "Save Draft" : "Publish"}
              </button>
            </div>
          </form>
        </div>
    </AdminLayout>
  );
};

export default CreateBlog;