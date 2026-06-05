"use client";

import { useRouter } from "next/navigation";
import styles from "./AdminShell.module.css";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin-auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" className={styles.profileBtn} onClick={logout} aria-label="Logout">
      AR
    </button>
  );
}
