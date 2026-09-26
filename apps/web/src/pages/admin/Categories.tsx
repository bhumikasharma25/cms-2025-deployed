import { useState } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryForm {
  name: string;
  slug: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Technology", slug: "technology" },
    { id: "2", name: "Design", slug: "design" },
    { id: "3", name: "Development", slug: "development" },
    { id: "4", name: "Lifestyle", slug: "lifestyle" },
    { id: "5", name: "Business", slug: "business" },
    { id: "6", name: "AI & ML", slug: "ai-ml" },
    { id: "7", name: "DevOps", slug: "devops" },
    { id: "8", name: "Product", slug: "product" },
  ]);

  const [form, setForm] = useState<CategoryForm>({
    name: "",
    slug: "",
  });

  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: e.target.value });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, slug: e.target.value });
  };

  const handleAddCategory = () => {
    if (!form.name.trim() || !form.slug.trim()) return;
    const newCategory: Category = {
      id: Date.now().toString(),
      name: form.name,
      slug: form.slug,
    };
    setCategories([...categories, newCategory]);
    setForm({ name: "", slug: "" });
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const navigateToBlogs = () => {
    navigate("/admin/blogs");
  };

  return (
    <AdminLayout>
        <div style={{
          padding: "24px",
          maxWidth: "1200px",
          width: "100%"
        }}>
          <h2 style={{ color: "#1e293b", marginBottom: "24px" }}>Categories</h2>

          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ color: "#3f3f46", marginBottom: "16px" }}>Add New Category</h3>
            <form
              style={{ maxWidth: "400px" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCategory();
              }}
            >
              <div style={{ marginBottom: "16px" }}>
                <label style={{
                  display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px"
                }}>Category Name</label>
                <input
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontFamily: "inherit",
                    fontSize: "14px",
                  }}
                  placeholder="Category name"
                  value={form.name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{
                  display: "block", fontWeight: "600", color: "#1e293b", marginBottom: "8px"
                }}>Slug</label>
                <input
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontFamily: "inherit",
                    fontSize: "14px",
                  }}
                  placeholder="technology"
                  value={form.slug}
                  onChange={handleSlugChange}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
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
                  Add Category
                </button>
                <button
                  type="button"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#64748b",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={navigateToBlogs}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "24px",
              fontSize: "14px",
              minWidth: "600px"
            }}>
              <thead>
                <tr style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "12px 0",
                }}>
                  <th style={{ padding: "8px", textAlign: "left" }}><span style={{ color: "#64748b" }}>Name</span></th>
                  <th style={{ padding: "8px", textAlign: "left" }}><span style={{ color: "#64748b" }}>Slug</span></th>
                  <th style={{ padding: "8px", textAlign: "left" }}><span style={{ color: "#64748b" }}>Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} style={{
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 0",
                  }}>
                    <td style={{ padding: "8x" }}><span style={{ color: "#1e293b" }}>{cat.name}</span></td>
                    <td style={{ padding: "8px" }}><span style={{ color: "#64748b" }}>{cat.slug}</span></td>
                    <td style={{ padding: "8px" }}>
                      <button
                        style={{
                          marginRight: "8px",
                          background: "transparent",
                          border: "none",
                          color: "#3b82f6",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                        onClick={() => handleDeleteCategory(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </AdminLayout>
  );
};

export default CategoriesPage;