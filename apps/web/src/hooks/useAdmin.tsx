import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  authApi,
  getAdminEmail,
  getAdminName,
  hasToken,
} from "../services/api";
import { authorInitials } from "../utils/blog";

export interface AdminIdentity {
  name: string;
  email: string;
  initials: string;
}

const FALLBACK: AdminIdentity = {
  name: "Admin",
  email: "",
  initials: "A",
};

const AdminContext = createContext<AdminIdentity>(FALLBACK);

/**
 * Resolves the signed-in admin once per mount.
 *
 * The backend is returning the admin object from `POST /api/admin/login` and
 * `GET /api/admin/profile`, but may not do so on every deployment, so this
 * reads the cached value first and only calls the profile endpoint when the
 * name is still unknown. Until the backend sends a name, everything falls back
 * to a generic "Admin" rather than a hardcoded person.
 */
export function AdminProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentity] = useState<AdminIdentity>(() => {
    const name = getAdminName();
    return {
      name,
      email: getAdminEmail(),
      initials: authorInitials(name),
    };
  });

  const resolve = useCallback(async () => {
    if (!hasToken()) return;

    try {
      const result = await authApi.profile();
      const admin = result?.admin ?? result?.user;
      if (!admin?.name) return;

      localStorage.setItem("adminName", admin.name);
      if (admin.email) localStorage.setItem("adminEmail", admin.email);
      setIdentity({
        name: admin.name,
        email: admin.email ?? getAdminEmail(),
        initials: authorInitials(admin.name),
      });
    } catch {
      // Token invalid or the endpoint is absent — keep the fallback.
    }
  }, []);

  useEffect(() => {
    // Only worth a request if we do not already know who this is.
    if (identity.name === "Admin") void resolve();
  }, [identity.name, resolve]);

  const value = useMemo(() => identity, [identity]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => useContext(AdminContext);
