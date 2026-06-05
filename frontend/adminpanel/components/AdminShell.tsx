"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/adminData";
import LogoutButton from "./LogoutButton";
import styles from "./AdminShell.module.css";

export default function AdminShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const groups = navItems.reduce<Record<string, typeof navItems>>((acc, item) => {
    acc[item.group] = [...(acc[item.group] ?? []), item];
    return acc;
  }, {});

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/admin/dashboard" className={styles.brand}>
          <span className={styles.brandMark} />
          <strong>Ghorer</strong>
        </Link>

        <nav className={styles.nav} aria-label="Admin navigation">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group} className={styles.navGroup}>
              <p>{group}</p>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${pathname === item.href ? styles.active : ""}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.label}</span>
                  {item.badge ? <em>{item.badge}</em> : null}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuBtn} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
          <label className={styles.search}>
            <input type="search" placeholder="Search" />
            <span>⌕</span>
          </label>
          <div className={styles.topActions}>
            <button aria-label="Settings">⚙</button>
            <button aria-label="Apps">▦</button>
            <button aria-label="More">⋮</button>
            <button className={styles.bell} aria-label="Notifications">
              ●
              <small>5</small>
            </button>
            <LogoutButton />
          </div>
        </header>

        <section className={styles.content}>
          <div className={styles.pageHeader}>
            <div>
              <p className={styles.eyebrow}>Ghorer Bazar Admin</p>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            {action ? <div className={styles.headerActions}>{action}</div> : null}
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
