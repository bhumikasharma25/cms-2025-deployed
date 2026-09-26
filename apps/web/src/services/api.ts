/**
 * Typed client for the backend API.
 *
 * Base path is `/api/admin` to match the backend router mount
 * (`app.use("/api/admin", authRoutes)`), not the `/api/auth` path
 * written in the PRD. Admin session state is read from the JWT that
 * `POST /api/admin/login` returns.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001";
const ADMIN_PREFIX = "/api/admin";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${ADMIN_PREFIX}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new ApiError(
      payload?.message ?? `Request failed with status ${response.status}`,
      response.status
    );
  }

  return payload?.data as T;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  admin: { id: string; name: string; email: string };
}

export const authApi = {
  login: (input: LoginInput) =>
    request<LoginResult>("/login", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  profile: () => request<{ id: string; name: string; email: string }>("/profile"),
};

export const TOKEN_KEY = "token";
export const AUTH_KEY = "isAuthenticated";
