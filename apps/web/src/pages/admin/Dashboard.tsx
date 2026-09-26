<<<<<<< HEAD
import { AdminLayout } from "../../components/admin/admin-layout";

function Dashboard() {
  return (
    <AdminLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Welcome back, Arpita. Here is what is happening.</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Blogs</div>
            <div className="stat-value">25</div>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Published</div>
            <div className="stat-value">18</div>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Drafts</div>
            <div className="stat-value">7</div>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Categories</div>
            <div className="stat-value">5</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
=======
import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/admin-layout";

interface AuthorStats {
  total: number;
  published: number;
  drafts: number;
}

interface CategoryStats {
  total: number;
}

const initialAuthorStats: AuthorStats = { total: 0, published: 0, drafts: 0 };
const initialCategoryStats: CategoryStats = { total: 0 };

const Dashboard = () => {
  const [authorStats, setAuthorStats] = useState<AuthorStats>(initialAuthorStats);
  const [categoryStats, setCategoryStats] = useState<CategoryStats>(initialCategoryStats);

  useEffect(() => {
    // Mock data - will be replaced with API calls later
    setAuthorStats({
      total: 5,
      published: 3,
      drafts: 2,
    });
    setCategoryStats({
      total: 8,
    });
  }, []);

  return (
    <AdminLayout>
        <div style={{
          padding: "24px",
          maxWidth: "1200px",
          width: "100%"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "32px"
          }}>
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#1e293b" }}>{authorStats.total}</div>
              <div style={{ color: "#64748b", marginBottom: "8px" }}>Total Authors</div>
              <div style={{ color: "#64748b" }}>Across all blogs</div>
            </div>
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#3b82f6" }}>{authorStats.published}</div>
              <div style={{ color: "#64748b", marginBottom: "8px" }}>Published</div>
              <div style={{ color: "#64748b" }}>Live blogs</div>
            </div>
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#f97316" }}>{authorStats.drafts}</div>
              <div style={{ color: "#64748b", marginBottom: "8px" }}>Drafts</div>
              <div style={{ color: "#64748b" }}>Pending review</div>
            </div>
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "24px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#8b2151" }}>{categoryStats.total}</div>
              <div style={{ color: "#64748b", marginBottom: "8px" }}>Categories</div>
              <div style={{ color: "#64748b" }}>Defined categories</div>
            </div>
          </div>

          <h2 style={{ color: "#1e293b", marginBottom: "16px" }}>Recent Activity</h2>
          <p style={{ color: "#64748b", marginBottom: "16px" }}>No recent posts yet. Create your first blog to get started.</p>
        </div>
    </AdminLayout>
  );
};

export default Dashboard;
>>>>>>> c69ad02 (changes in Pages)
