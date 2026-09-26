import { useMemo, useState } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { useToast } from "../../components/admin/Toast";
import {
  IconArchive,
  IconCheck,
  IconClock,
  IconEdit,
  IconFolder,
  IconPlus,
  IconSearch,
  IconTrash,
} from "../../components/admin/icons";

type CategoryStatus = "active" | "draft" | "archived";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  posts: number;
  status: CategoryStatus;
}

const seed: Category[] = [
  {
    id: "1",
    name: "Design Systems",
    slug: "design-systems",
    description:
      "Parent category for reusable design patterns, component documentation, and layout standards.",
    posts: 128,
    status: "active",
  },
  {
    id: "2",
    name: "Component Library",
    slug: "component-library",
    description: "Child category documenting every shared component.",
    posts: 64,
    status: "active",
  },
  {
    id: "3",
    name: "Layout Patterns",
    slug: "layout-patterns",
    description: "Child category for grid, flexbox and spacing conventions.",
    posts: 31,
    status: "active",
  },
  {
    id: "4",
    name: "Performance",
    slug: "performance",
    description:
      "Parent category for rendering, bundling and runtime optimisation write-ups.",
    posts: 87,
    status: "active",
  },
  {
    id: "5",
    name: "Security",
    slug: "security",
    description: "Child category for auth, OWASP and dependency hygiene.",
    posts: 29,
    status: "draft",
  },
];

const statusLabel: Record<CategoryStatus, string> = {
  active: "Active",
  draft: "Draft",
  archived: "Archived",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(seed);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(seed[0].id);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", description: "" });
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);
  const { show, node } = useToast();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? categories.filter((c) => c.name.toLowerCase().includes(q))
      : categories;
  }, [categories, query]);

  const selected = categories.find((c) => c.id === selectedId) ?? categories[0];

  const stats = [
    {
      label: "Total categories",
      value: categories.length,
      Icon: IconFolder,
    },
    {
      label: "Active categories",
      value: categories.filter((c) => c.status === "active").length,
      Icon: IconCheck,
    },
    {
      label: "Draft categories",
      value: categories.filter((c) => c.status === "draft").length,
      Icon: IconClock,
    },
    {
      label: "Archived categories",
      value: categories.filter((c) => c.status === "archived").length,
      Icon: IconArchive,
    },
  ];

  const openCreate = () => {
    setEditingId(null);
    setDraft({ name: "", description: "" });
    setShowForm(true);
  };

  const openEdit = (category: Category) => {
    setEditingId(category.id);
    setDraft({ name: category.name, description: category.description });
    setShowForm(true);
  };

  const saveCategory = () => {
    const name = draft.name.trim();
    if (name.length < 2) {
      show("Category name must be at least 2 characters.", "error");
      return;
    }

    if (editingId) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, name, slug: slugify(name), description: draft.description.trim() }
            : c
        )
      );
      show("Category updated successfully.");
    } else {
      const created: Category = {
        id: `c${Date.now()}`,
        name,
        slug: slugify(name),
        description: draft.description.trim() || "No description yet.",
        posts: 0,
        status: "draft",
      };
      setCategories((prev) => [created, ...prev]);
      setSelectedId(created.id);
      show("Category created successfully.");
    }

    setShowForm(false);
    setDraft({ name: "", description: "" });
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const next = categories.filter((c) => c.id !== pendingDelete.id);
    setCategories(next);
    if (selectedId === pendingDelete.id) {
      setSelectedId(next[0]?.id ?? "");
    }
    show("Category deleted successfully.");
    setPendingDelete(null);
  };

  return (
    <AdminLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Categories</h1>
          <p className="page-sub">Manage category hierarchy, visibility and post assignment.</p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            <IconPlus size={16} />
            Add Category
          </button>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map(({ label, value, Icon }) => (
          <div className="stat-card" key={label}>
            <div>
              <div className="stat-label">{label}</div>
              <div className="stat-value">{value}</div>
            </div>
            <span className="stat-icon">
              <Icon size={16} />
            </span>
          </div>
        ))}
      </div>

      <div className="split">
        <section className="card">
          <div className="card-head">
            <div>
              <div className="card-title">All Categories</div>
              <div className="card-desc">
                {visible.length} of {categories.length} categories
              </div>
            </div>
            <div className="search-box">
              <IconSearch size={15} />
              <input
                type="search"
                placeholder="Search categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search categories"
              />
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Posts</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((category) => (
                    <tr
                      key={category.id}
                      className={category.id === selected?.id ? "selected" : ""}
                      onClick={() => setSelectedId(category.id)}
                    >
                      <td>
                        <div className="cell-media">
                          <span className="tile">
                            <IconFolder size={15} />
                          </span>
                          <div>
                            <div className="cell-strong">{category.name}</div>
                            <span className="cell-sub">
                              {category.posts} posts
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{category.posts}</td>
                      <td>
                        <span className={`badge badge-${category.status}`}>
                          {statusLabel[category.status]}
                        </span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="icon-btn"
                            aria-label={`Edit ${category.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(category);
                            }}
                          >
                            <IconEdit size={15} />
                          </button>
                          <button
                            type="button"
                            className="icon-btn danger"
                            aria-label={`Delete ${category.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPendingDelete(category);
                            }}
                          >
                            <IconTrash size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No categories found.</h3>
              <p>Try a different search, or add a new category.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={openCreate}
              >
                <IconPlus size={16} />
                Add Category
              </button>
            </div>
          )}
        </section>

        <aside className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Category Details</div>
              <div className="card-desc">Currently selected node</div>
            </div>
            {selected && (
              <span className={`badge badge-${selected.status}`}>
                {statusLabel[selected.status]}
              </span>
            )}
          </div>

          {selected ? (
            <>
              <div className="detail-kv">
                <div className="detail-key">Category name</div>
                <div className="detail-val">{selected.name}</div>
              </div>
              <div className="detail-kv">
                <div className="detail-key">Slug</div>
                <div className="detail-val">{selected.slug}</div>
              </div>
              <div className="detail-kv">
                <div className="detail-key">Posts</div>
                <div className="detail-val">{selected.posts}</div>
              </div>
              <div className="detail-kv">
                <div className="detail-key">Description</div>
                <div className="detail-val">{selected.description}</div>
              </div>
              <div className="detail-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-block"
                  onClick={() => openEdit(selected)}
                >
                  <IconEdit size={15} />
                  Edit Category
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setCategories((prev) =>
                      prev.map((c) =>
                        c.id === selected.id
                          ? {
                              ...c,
                              status: c.status === "active" ? "draft" : "active",
                            }
                          : c
                      )
                    );
                    show("Category status updated.");
                  }}
                >
                  {selected.status === "active" ? "Move to Draft" : "Publish Changes"}
                </button>
              </div>
            </>
          ) : (
            <p className="card-desc">Select a category to see its details.</p>
          )}
        </aside>
      </div>

      {showForm && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={editingId ? "Edit category" : "Add category"}
          onClick={() => setShowForm(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              {editingId ? "Edit Category" : "Add Category"}
            </div>
            <div style={{ marginTop: 18 }}>
              <div className="field">
                <label className="label" htmlFor="cat-name">
                  Category name
                </label>
                <input
                  id="cat-name"
                  className="input"
                  value={draft.name}
                  placeholder="e.g. Design Systems"
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, name: e.target.value }))
                  }
                  autoFocus
                />
                <p className="hint">
                  Slug: {slugify(draft.name) || "your-category-slug"}
                </p>
              </div>
              <div className="field">
                <label className="label" htmlFor="cat-desc">
                  Description
                </label>
                <textarea
                  id="cat-desc"
                  className="textarea"
                  value={draft.description}
                  placeholder="What belongs in this category?"
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, description: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveCategory}
              >
                {editingId ? "Save Changes" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete this category?"
        message={`"${pendingDelete?.name}" will be removed. Posts in this category will need to be reassigned.`}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      {node}
    </AdminLayout>
  );
}
