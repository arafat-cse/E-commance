"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("/api/admin-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.success) {
        setError(payload.error ?? "Login failed.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Backend API is not reachable.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" placeholder="admin@example.com" autoComplete="email" required />
      </label>
      <label>
        Password
        <input name="password" type="password" placeholder="Password" autoComplete="current-password" required />
      </label>
      {error ? <p className={styles.error}>{error}</p> : null}
      <button type="submit" className={styles.submit}>
        Sign In
      </button>
    </form>
  );
}
