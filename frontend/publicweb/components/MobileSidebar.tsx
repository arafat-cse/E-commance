'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import styles from './MobileSidebar.module.css';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Combos', href: '/combos' },
  { label: 'Offer Zone', href: '/collections/offer-zone' },
  { label: 'Mango', href: '#mango', scroll: 'mango' },
  { label: 'Honey', href: '#honey', scroll: 'honey' },
  { label: 'Oil & Ghee', href: '#ghee', scroll: 'ghee' },
  { label: 'Dates', href: '#dates', scroll: 'dates' },
  { label: 'Spices', href: '#spices' },
  { label: 'Nuts & Seeds', href: '#dates', scroll: 'dates' },
  { label: 'Beverage', href: '#' },
  { label: 'Rice', href: '#' },
  { label: 'Flours & Lentils', href: '#' },
  { label: 'Certified', href: '#' },
  { label: 'Pickle', href: '#' },
];

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setSearchQuery } = useStore();

  const handleScroll = (scrollId?: string, href?: string) => {
    onClose();
    if (scrollId) {
      if (pathname !== '/') {
        router.push(`/#${scrollId}`);
      } else {
        const el = document.getElementById(scrollId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setSearchQuery('');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`} role="dialog" aria-modal="true" aria-label="Site menu">
        {/* Sidebar Header */}
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarProfile}>
            <div className={styles.avatarCircle}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p className={styles.sidebarGreeting}>Hello there!</p>
              <Link href="/login" className={styles.sidebarSignin} onClick={onClose}>
                Sign In / Register
              </Link>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Main Category Nav */}
        <div className={styles.sidebarSection}>
          <p className={styles.sectionLabel}>Categories</p>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.href + item.label}>
                {item.scroll ? (
                  <button
                    className={styles.menuItem}
                    onClick={() => handleScroll(item.scroll)}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`${styles.menuItem} ${pathname === item.href ? styles.menuItemActive : ''}`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.sidebarSection}>
          <p className={styles.sectionLabel}>Quick Links</p>
          <ul className={styles.menuList}>
            <li>
              <Link href="/login" className={styles.menuItem} onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Sign In / Account
              </Link>
            </li>
            <li>
              <a href="tel:+8801313555222" className={styles.menuItem} onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call Us
              </a>
            </li>
            <li>
              <a href="https://wa.me/8801313555222" target="_blank" rel="noopener noreferrer" className={styles.menuItem} onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Hotline at bottom */}
        <div className={styles.sidebarFooter}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>হেল্পলাইন: ০১৩১৩-৫৫৫২২২</span>
        </div>
      </div>
    </>
  );
}
