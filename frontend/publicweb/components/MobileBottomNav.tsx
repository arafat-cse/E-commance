'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import styles from './MobileBottomNav.module.css';

interface MobileBottomNavProps {
  onMenuToggle: () => void;
}

export default function MobileBottomNav({ onMenuToggle }: MobileBottomNavProps) {
  const { cart, setIsCartOpen } = useStore();
  const pathname = usePathname();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={styles.bottomNav} aria-label="Mobile bottom navigation">
      {/* HOME */}
      <Link
        href="/"
        className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>HOME</span>
      </Link>

      {/* MENU */}
      <button className={styles.navItem} onClick={onMenuToggle} aria-label="Open menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <span>MENU</span>
      </button>

      {/* CART */}
      <button
        className={styles.navItem}
        onClick={() => setIsCartOpen(true)}
        aria-label="Open cart"
      >
        <div className={styles.cartWrapper}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalCartItems > 0 && (
            <span className={styles.cartBadge}>{totalCartItems}</span>
          )}
        </div>
        <span>CART</span>
      </button>

      {/* SEARCH */}
      <button
        className={styles.navItem}
        aria-label="Search"
        onClick={() => {
          const input = document.querySelector(`.mobileSearchInput, input[type="text"]`) as HTMLInputElement | null;
          if (input) {
            input.focus();
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>SEARCH</span>
      </button>

      {/* ACCOUNT */}
      <Link
        href="/login"
        className={`${styles.navItem} ${pathname === '/login' ? styles.active : ''}`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>ACCOUNT</span>
      </Link>
    </nav>
  );
}
