import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/admin/admin-layout";

export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <AdminLayout>
      <div className="page-head">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">This screen is part of the next sprint.</p>
        </div>
      </div>

      <div className="empty-state">
        <h3>Coming soon</h3>
        <p>The {title} module is currently under construction.</p>
        <Link className="btn btn-primary" to="/admin/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </AdminLayout>
  );
}
