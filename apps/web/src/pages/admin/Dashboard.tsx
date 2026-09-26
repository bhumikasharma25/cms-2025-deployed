import { AdminLayout } from "../../components/admin/admin-layout";
import {
  IconArchive,
  IconCheck,
  IconClock,
  IconFolder,
} from "../../components/admin/icons";
import { adminBlogs, adminCategories } from "../../data/adminBlogs";

export default function Dashboard() {
  const stats = [
    {
      label: "Total blogs",
      value: adminBlogs.length,
      Icon: IconFolder,
    },
    {
      label: "Published",
      value: adminBlogs.filter((b) => b.status === "published").length,
      Icon: IconCheck,
    },
    {
      label: "Drafts",
      value: adminBlogs.filter((b) => b.status === "draft").length,
      Icon: IconClock,
    },
    {
      label: "Categories",
      value: adminCategories.length,
      Icon: IconArchive,
    },
  ];

  const recent = adminBlogs.slice(0, 4);

  return (
    <AdminLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Welcome back, Arpita. Here is what is happening.</p>
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

      <section className="card">
        <div className="card-head">
          <div>
            <div className="card-title">Recent posts</div>
            <div className="card-desc">The latest activity across your blog.</div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((blog) => (
                <tr key={blog.id}>
                  <td className="cell-strong">{blog.title}</td>
                  <td style={{ color: "var(--muted)" }}>{blog.category}</td>
                  <td>
                    <span className={`badge badge-${blog.status}`}>
                      {blog.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}
