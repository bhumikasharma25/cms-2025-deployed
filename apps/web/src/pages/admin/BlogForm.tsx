import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";
import ConfirmModal from "../../components/admin/ConfirmModal";
import { useToast } from "../../components/admin/Toast";
import { adminCategories } from "../../data/adminBlogs";
import type { Blog, BlogStatus } from "../../types/blog";
import { formatDate } from "../../utils/blog";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

interface EditorState {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string;
  status: BlogStatus;
}

const emptyState: EditorState = {
  title: "",
  description: "",
  content: "",
  thumbnail: "",
  category: "Technology",
  tags: "",
  status: "draft",
};

const toolbar: { label: string; title: string; wide?: boolean }[] = [
  { label: "B", title: "Bold" },
  { label: "I", title: "Italic" },
  { label: "U", title: "Underline" },
  { label: "•", title: "Bullet list", wide: true },
  { label: "1.", title: "Numbered list", wide: true },
  { label: "❝", title: "Quote", wide: true },
  { label: "🔗", title: "Insert link", wide: true },
  { label: "▣", title: "Insert image", wide: true },
  { label: "{ }", title: "Code block", wide: true },
];

interface BlogFormProps {
  mode: "create" | "edit";
  initial?: Blog;
}

export default function BlogForm({ mode, initial }: BlogFormProps) {
  const [form, setForm] = useState<EditorState>(() =>
    initial
      ? {
          title: initial.title,
          description: initial.description,
          content: initial.content,
          thumbnail: initial.thumbnail,
          category: initial.category,
          tags: initial.tags.join(", "),
          status: initial.status,
        }
      : emptyState
  );
  const [errors, setErrors] = useState<Partial<Record<keyof EditorState, string>>>({});
  const [confirmTrash, setConfirmTrash] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { show, node } = useToast();

  const set = <K extends keyof EditorState>(key: K, value: EditorState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof EditorState, string>> = {};
    if (form.title.trim().length < 5)
      next.title = "Title must be at least 5 characters";
    if (!form.description.trim()) next.description = "Description is required";
    if (!form.content.trim()) next.content = "Content is required";
    if (form.status === "published" && !form.thumbnail.trim())
      next.thumbnail = "A featured image is required to publish";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const save = (status: BlogStatus) => {
    setForm((prev) => ({ ...prev, status }));
    if (!validate()) {
      show("Please fix the highlighted fields.", "error");
      return;
    }
    show(
      mode === "create"
        ? status === "published"
          ? "Post published successfully."
          : "Draft saved successfully."
        : "Post updated successfully."
    );
  };

  const onPickImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|jpg|webp|gif)$/.test(file.type)) {
      show("Only JPG, PNG, WEBP or GIF images are supported.", "error");
      return;
    }
    set("thumbnail", URL.createObjectURL(file));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save(form.status);
  };

  return (
    <AdminLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">
            {mode === "create" ? "Create Post" : "Edit Post"}
          </h1>
          <p className="page-sub">
            {mode === "create"
              ? "Draft a new article and publish when it is ready."
              : "Update the content and publishing settings for this post."}
          </p>
        </div>
      </div>

      <form className="editor-split" onSubmit={onSubmit} noValidate>
        <div>
          <section className="card">
            <div className="field">
              <label className="label" htmlFor="post-title">
                Post title
              </label>
              <input
                id="post-title"
                className="input"
                value={form.title}
                placeholder="Enter a clear, descriptive title"
                onChange={(e) => set("title", e.target.value)}
                aria-invalid={errors.title ? true : undefined}
              />
              {errors.title && <p className="hint err">{errors.title}</p>}
              <p className="hint">
                Public URL: /blog/{slugify(form.title) || "your-post-slug"}
              </p>
            </div>

            <div className="field">
              <label className="label" htmlFor="post-desc">
                Short description
              </label>
              <textarea
                id="post-desc"
                className="textarea"
                style={{ minHeight: 72 }}
                value={form.description}
                placeholder="One or two sentences used on cards and search results"
                onChange={(e) => set("description", e.target.value)}
                aria-invalid={errors.description ? true : undefined}
              />
              {errors.description && (
                <p className="hint err">{errors.description}</p>
              )}
            </div>

            <div className="form-row">
              <div className="field">
                <label className="label" htmlFor="post-category">
                  Category
                </label>
                <select
                  id="post-category"
                  className="select"
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {adminCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="post-tags">
                  Tags (comma separated)
                </label>
                <input
                  id="post-tags"
                  className="input"
                  value={form.tags}
                  placeholder="node, graphql, api"
                  onChange={(e) => set("tags", e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Featured image</label>
              {form.thumbnail ? (
                <div className="img-preview">
                  <img src={form.thumbnail} alt="" />
                  <div className="img-preview-actions">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => fileRef.current?.click()}
                    >
                      Change Image
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger-outline btn-sm"
                      onClick={() => set("thumbnail", "")}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => fileRef.current?.click()}
                >
                  Upload Image
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                hidden
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={onPickImage}
              />
              {errors.thumbnail && (
                <p className="hint err">{errors.thumbnail}</p>
              )}
            </div>
          </section>

          <section className="card">
            <div className="editor-shell">
              <div className="editor-toolbar" role="toolbar" aria-label="Formatting">
                {toolbar.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    className={`editor-btn${item.wide ? " wide" : ""}`}
                    title={item.title}
                    aria-label={item.title}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <label className="sr-only" htmlFor="post-content">
                Post content
              </label>
              <textarea
                id="post-content"
                className="editor-area"
                value={form.content}
                placeholder="Write your article..."
                onChange={(e) => set("content", e.target.value)}
                aria-invalid={errors.content ? true : undefined}
              />
            </div>
            {errors.content && <p className="hint err">{errors.content}</p>}
          </section>
        </div>

        <aside className="card">
          <div className="card-title">Publish Settings</div>

          <div className="publish-row">
            <span className="publish-key">Status</span>
            <span className={`badge badge-${form.status}`}>
              {form.status === "published" ? "Published" : "Draft"}
            </span>
          </div>
          <div className="publish-row">
            <span className="publish-key">Visibility</span>
            <span className="publish-val">Public</span>
          </div>
          <div className="publish-row">
            <span className="publish-key">Publish date</span>
            <span className="publish-val">
              {initial ? formatDate(initial.createdAt) : "Immediately"}
            </span>
          </div>

          <div className="publish-actions">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={() => save("published")}
            >
              {mode === "create" ? "Publish Post" : "Update Post"}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-block"
              onClick={() => save("draft")}
            >
              Save as Draft
            </button>
            {mode === "edit" && (
              <button
                type="button"
                className="btn btn-danger-outline btn-block"
                onClick={() => setConfirmTrash(true)}
              >
                Move to Trash
              </button>
            )}
          </div>
        </aside>
      </form>

      <ConfirmModal
        open={confirmTrash}
        title="Move this post to trash?"
        message="The post will be removed from the admin list. This action cannot be undone."
        confirmLabel="Move to Trash"
        onConfirm={() => {
          setConfirmTrash(false);
          show("Post moved to trash.");
        }}
        onCancel={() => setConfirmTrash(false)}
      />

      {node}
    </AdminLayout>
  );
}
