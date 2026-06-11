const TOKEN_KEY = "nexora-auth-token";
const USER_KEY = "nexora-user";

type LoginPayload = {
  email: string;
  password: string;
  remember: boolean;
};

type AuthResponse = {
  token_type: string;
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        device_name: "web-client",
      }),
    });
  } catch {
    throw new Error(
      `Tidak bisa terhubung ke Nexora API di ${API_BASE_URL}. Pastikan nexora-api sudah berjalan.`,
    );
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Login failed");
  }

  const data: AuthResponse = await response.json();

  // Store token and user
  localStorage.setItem(TOKEN_KEY, data.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data;
}

export async function logout(): Promise<void> {
  const token = getToken();

  if (token) {
    await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => null);
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
