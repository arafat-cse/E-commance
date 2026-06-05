import { NextResponse } from "next/server";

type LoginResponse = {
  success?: boolean;
  data?: {
    access_token?: string;
    user?: {
      role?: string;
      name?: string;
      email?: string;
    };
  };
  error?: string;
};

export async function POST(request: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
  const credentials = await request.json();

  let loginResponse: Response;

  try {
    loginResponse = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Backend API is not reachable.",
      },
      { status: 503 },
    );
  }

  const payload = (await loginResponse.json().catch(() => ({}))) as LoginResponse;
  const token = payload.data?.access_token;
  const user = payload.data?.user;

  if (!loginResponse.ok || !payload.success || !token || user?.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        error: user?.role && user.role !== "admin" ? "Admin access required." : payload.error ?? "Login failed.",
      },
      { status: loginResponse.ok ? 403 : loginResponse.status },
    );
  }

  const response = NextResponse.json({ success: true, user });

  response.cookies.set("gb_admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  response.cookies.set("gb_admin_role", "admin", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
