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
