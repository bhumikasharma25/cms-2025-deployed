import { useMemo, useRef, useState } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";
import { useToast } from "../../components/admin/Toast";
import ConfirmModal from "../../components/admin/ConfirmModal";
import {
  IconImage,
  IconSearch,
  IconTrash,
  IconUpload,
} from "../../components/admin/icons";

type Kind = "image" | "doc" | "video";

interface MediaItem {
  id: string;
  name: string;
  size: string;
  kind: Kind;
  preview?: string;
  gradient: string;
}

const seed: MediaItem[] = [
  {
    id: "m1",
    name: "server-nodes.png",
    size: "2.4 MB",
    kind: "image",
    gradient: "linear-gradient(135deg,#0ea5e9,#1e3a8a 60%,#312e81)",
  },
  {
    id: "m2",
    name: "office-desk.jpg",
    size: "1.8 MB",
    kind: "image",
    gradient: "linear-gradient(135deg,#fdba74,#78350f 65%,#1c1917)",
  },
  {
    id: "m3",
    name: "ai-trends.png",
    size: "3.1 MB",
    kind: "image",
    gradient: "linear-gradient(135deg,#f472b6,#7c3aed 55%,#1e1b4b)",
  },
  {
    id: "m4",
    name: "code-editor.png",
    size: "890 KB",
    kind: "image",
    gradient: "linear-gradient(135deg,#334155,#0f172a 60%,#020617)",
  },
  {
    id: "m5",
    name: "mobile-preview.jpg",
    size: "1.1 MB",
    kind: "image",
    gradient: "linear-gradient(135deg,#38bdf8,#0369a1 55%,#082f49)",
  },
  {
    id: "m6",
    name: "chart-analytics.png",
    size: "1.4 MB",
    kind: "image",
    gradient: "linear-gradient(135deg,#93c5fd,#1e293b 60%,#0f172a)",
  },
  {
    id: "m7",
    name: "team-discussion.jpg",
    size: "4.2 MB",
    kind: "image",
    gradient: "linear-gradient(135deg,#fcd34d,#b45309 60%,#451a03)",
  },
  {
    id: "m8",
    name: "coffee-notebook.jpg",
    size: "1.5 MB",
    kind: "image",
    gradient: "linear-gradient(135deg,#e7e5e4,#a8a29e 55%,#44403c)",
  },
  {
    id: "m9",
    name: "brand-guidelines.pdf",
    size: "620 KB",
    kind: "doc",
    gradient: "linear-gradient(135deg,#fca5a5,#b91c1c 60%,#450a0a)",
  },
  {
    id: "m10",
    name: "release-notes.md",
    size: "48 KB",
    kind: "doc",
    gradient: "linear-gradient(135deg,#c4b5fd,#6d28d9 60%,#2e1065)",
  },
  {
    id: "m11",
    name: "product-tour.mp4",
    size: "18.6 MB",
    kind: "video",
    gradient: "linear-gradient(135deg,#6ee7b7,#047857 60%,#022c22)",
  },
  {
    id: "m12",
    name: "onboarding.mp4",
    size: "12.3 MB",
    kind: "video",
    gradient: "linear-gradient(135deg,#fda4af,#9f1239 60%,#4c0519)",
  },
];

const filters: { key: "all" | Kind; label: string }[] = [
  { key: "all", label: "All" },
  { key: "image", label: "Images" },
  { key: "doc", label: "Docs" },
  { key: "video", label: "Videos" },
];

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export default function Media() {
  const [items, setItems] = useState<MediaItem[]>(seed);
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { show, node } = useToast();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (filter === "all" || item.kind === filter) &&
        (!q || item.name.toLowerCase().includes(q))
    );
  }, [items, filter, query]);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const added: MediaItem[] = [];
    for (const file of Array.from(files)) {
      const kind: Kind = file.type.startsWith("video/")
        ? "video"
        : file.type.startsWith("image/")
          ? "image"
          : "doc";

      added.push({
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        size: formatSize(file.size),
        kind,
        preview: kind === "image" ? URL.createObjectURL(file) : undefined,
        gradient:
          kind === "image"
            ? "linear-gradient(135deg,#94a3b8,#334155 60%,#0f172a)"
            : "linear-gradient(135deg,#cbd5e1,#475569 60%,#1e293b)",
      });
    }

    setItems((prev) => [...added, ...prev]);
    show(
      added.length === 1
        ? `${added[0].name} uploaded successfully.`
        : `${added.length} files uploaded successfully.`
    );
    if (fileRef.current) fileRef.current.value = "";
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setItems((prev) => prev.filter((item) => item.id !== pendingDelete.id));
    show(`${pendingDelete.name} deleted successfully.`);
    setPendingDelete(null);
  };

  return (
    <AdminLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Media Library</h1>
          <p className="page-sub">
            Upload and manage images, documents and videos used in posts.
          </p>
        </div>
        <div className="page-actions">
          <input
            ref={fileRef}
            type="file"
            multiple
            hidden
            accept="image/*,application/pdf,.md,.doc,.docx,video/*"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fileRef.current?.click()}
          >
            <IconUpload size={16} />
            Upload File
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="chips">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`chip${filter === f.key ? " active" : ""}`}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="search-box">
          <IconSearch size={15} />
          <input
            type="search"
            placeholder="Search media files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search media files"
          />
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="media-grid">
          {visible.map((item) => (
            <article className="media-card" key={item.id}>
              <div
                className="media-thumb"
                style={
                  item.preview
                    ? {
                        backgroundImage: `url(${item.preview})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : { backgroundImage: item.gradient }
                }
              >
                {!item.preview && <IconImage size={30} />}
              </div>
              <div className="media-meta">
                <div className="media-name">{item.name}</div>
                <div className="media-size">{item.size}</div>
              </div>
              <div className="media-actions">
                <button
                  type="button"
                  className="icon-btn danger"
                  aria-label={`Delete ${item.name}`}
                  onClick={() => setPendingDelete(item)}
                >
                  <IconTrash size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No media found.</h3>
          <p>Try a different filter or upload a new file.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => fileRef.current?.click()}
          >
            <IconUpload size={16} />
            Upload File
          </button>
        </div>
      )}

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete this file?"
        message={`"${pendingDelete?.name}" will be permanently removed from the media library. This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      {node}
    </AdminLayout>
  );
}
