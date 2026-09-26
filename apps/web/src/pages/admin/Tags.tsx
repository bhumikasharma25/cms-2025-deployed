import { useMemo, useState } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";
import { useToast } from "../../components/admin/Toast";
import ConfirmModal from "../../components/admin/ConfirmModal";
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTag,
  IconTrash,
} from "../../components/admin/icons";

interface Tag {
  id: string;
  name: string;
  posts: number;
  status: "active" | "draft" | "archived";
  description: string;
}

const seed: Tag[] = [
  {
    id: "t1",
    name: "React",
    posts: 42,
    status: "active",
    description: "Posts about React hooks, patterns and the component model.",
  },
  {
    id: "t2",
    name: "TypeScript",
    posts: 36,
    status: "active",
    description: "Typing strategies, generics and tooling for large codebases.",
  },
  {
    id: "t3",
    name: "Performance",
    posts: 24,
    status: "active",
    description: "Rendering, bundling and runtime optimisation write-ups.",
  },
  {
    id: "t4",
    name: "Accessibility",
    posts: 18,
    status: "active",
    description: "Inclusive design, ARIA patterns and keyboard navigation.",
  },
  {
    id: "t5",
    name: "GraphQL",
    posts: 11,
    status: "active",
    description: "Schema design, resolvers and client data fetching.",
  },
  {
    id: "t6",
    name: "Testing",
    posts: 9,
    status: "draft",
    description: "Unit, integration and end-to-end testing practices.",
  },
  {
    id: "t7",
    name: "Web3",
    posts: 4,
    status: "archived",
    description: "Legacy content about on-chain application development.",
  },
];

const statusLabel: Record<Tag["status"], string> = {
  active: "Active",
  draft: "Draft",
  archived: "Archived",
};

const emptyDraft = { name: "", description: "" };

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>(seed);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(seed[0].id);
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Tag | null>(null);
  const { show, node } = useToast();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? tags.filter((t) => t.name.toLowerCase().includes(q)) : tags;
  }, [tags, query]);

  const selected = tags.find((t) => t.id === selectedId) ?? tags[0];

  const stats = [
    { label: "Total tags", value: tags.length },
    {
      label: "Used tags",
      value: tags.filter((t) => t.status === "active").length,
    },
    { label: "Draft tags", value: tags.filter((t) => t.status === "draft").length },
    {
      label: "Archived tags",
      value: tags.filter((t) => t.status === "archived").length,
    },
  ];

  const openCreate = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setShowForm(true);
  };

  const openEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setDraft({ name: tag.name, description: tag.description });
    setShowForm(true);
  };

  const saveTag = () => {
    const name = draft.name.trim();
    if (name.length < 2) {
      show("Tag name must be at least 2 characters.", "error");
      return;
    }

    if (editingId) {
      setTags((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? { ...t, name, description: draft.description.trim() }
            : t
        )
      );
      show("Tag updated successfully.");
    } else {
      const created: Tag = {
        id: `t${Date.now()}`,
        name,
        posts: 0,
        status: "draft",
        description: draft.description.trim() || "No description yet.",
      };
      setTags((prev) => [created, ...prev]);
      setSelectedId(created.id);
      show("Tag created successfully.");
    }

    setShowForm(false);
    setDraft(emptyDraft);
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setTags((prev) => prev.filter((t) => t.id !== pendingDelete.id));
    if (selectedId === pendingDelete.id) {
      const next = tags.find((t) => t.id !== pendingDelete.id);
      setSelectedId(next ? next.id : "");
    }
    show("Tag deleted successfully.");
    setPendingDelete(null);
  };

  return (
    <AdminLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Tags</h1>
          <p className="page-sub">
            Manage the labels used to group posts across the blog.
          </p>
        </div>
        <div className="page-actions">
          <button type="button" className="btn btn-primary" onClick={openCreate}>
            <IconPlus size={16} />
            Add Tag
          </button>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
            <span className="stat-icon">
              <IconTag size={16} />
            </span>
          </div>
        ))}
      </div>

      <div className="split">
        <section className="card">
          <div className="card-head">
            <div>
              <div className="card-title">All Tags</div>
              <div className="card-desc">{visible.length} tags shown</div>
            </div>
            <div className="search-box">
              <IconSearch size={15} />
              <input
                type="search"
                placeholder="Search tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tags"
              />
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Posts</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((tag) => (
                    <tr
                      key={tag.id}
                      className={tag.id === selected?.id ? "selected" : ""}
                      onClick={() => setSelectedId(tag.id)}
                    >
                      <td>
                        <span className="cell-strong">#{tag.name}</span>
                      </td>
                      <td>{tag.posts}</td>
                      <td>
                        <span className={`badge badge-${tag.status}`}>
                          {statusLabel[tag.status]}
                        </span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="icon-btn"
                            aria-label={`Edit ${tag.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(tag);
                            }}
                          >
                            <IconEdit size={15} />
                          </button>
                          <button
                            type="button"
                            className="icon-btn danger"
                            aria-label={`Delete ${tag.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPendingDelete(tag);
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
              <h3>No tags found.</h3>
              <p>Create your first tag to start grouping posts.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={openCreate}
              >
                <IconPlus size={16} />
                Add Tag
              </button>
            </div>
          )}
        </section>

        <aside className="card">
          <div className="card-head">
            <div className="card-title">Selected Tag</div>
            {selected && (
              <span className={`badge badge-${selected.status}`}>
                {statusLabel[selected.status]}
              </span>
            )}
          </div>

          {selected ? (
            <>
              <div className="detail-kv">
                <div className="detail-key">Name</div>
                <div className="detail-val">#{selected.name}</div>
              </div>
              <div className="detail-kv">
                <div className="detail-key">Slug</div>
                <div className="detail-val">
                  {selected.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                </div>
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
                  Edit Tag
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setTags((prev) =>
                      prev.map((t) =>
                        t.id === selected.id
                          ? {
                              ...t,
                              status:
                                t.status === "active" ? "draft" : "active",
                            }
                          : t
                      )
                    );
                    show("Tag status updated.");
                  }}
                >
                  {selected.status === "active" ? "Move to Draft" : "Publish Tag"}
                </button>
              </div>
            </>
          ) : (
            <p className="card-desc">Select a tag to see its details.</p>
          )}
        </aside>
      </div>

      {showForm && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={editingId ? "Edit tag" : "Add tag"}
          onClick={() => setShowForm(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              {editingId ? "Edit Tag" : "Add Tag"}
            </div>
            <div style={{ marginTop: 18 }}>
              <div className="field">
                <label className="label" htmlFor="tag-name">
                  Tag name
                </label>
                <input
                  id="tag-name"
                  className="input"
                  value={draft.name}
                  placeholder="e.g. React"
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, name: e.target.value }))
                  }
                  autoFocus
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="tag-desc">
                  Description
                </label>
                <textarea
                  id="tag-desc"
                  className="textarea"
                  value={draft.description}
                  placeholder="What is this tag used for?"
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
              <button type="button" className="btn btn-primary" onClick={saveTag}>
                {editingId ? "Save Changes" : "Create Tag"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete this tag?"
        message={`"${pendingDelete?.name}" will be removed from every post that uses it. This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      {node}
    </AdminLayout>
  );
}
