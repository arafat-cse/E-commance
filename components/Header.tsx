'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import styles from './Header.module.css';

export default function Header() {
  const { cart, wishlist, searchQuery, setSearchQuery, setIsCartOpen } = useStore();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryScroll = (id: string) => {
    setSearchQuery('');
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarContent}`}>
          <div>
            <span>স্বাগতম! বিশুদ্ধ ও অর্গানিক খাদ্যের বিশ্বস্ত প্রতিষ্ঠান</span>
          </div>
          <div className={styles.topbarLinks}>
            <Link href="#track" className={styles.topbarLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              <span>অর্ডার ট্র্যাকিং</span>
            </Link>
            <Link href="#help" className={styles.topbarLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span>হেল্পলাইন</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Mid Bar */}
      <div className={styles.midbar}>
        <div className={`container ${styles.midbarContent}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={() => setSearchQuery('')}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className={styles.logoText}>Ghorer Bazar</span>
          </Link>

          {/* Search Box */}
          <div className={styles.searchBox}>
            <select className={styles.categorySelect} defaultValue="all">
              <option value="all">Search in...</option>
              <option value="honey">মধু (Honey)</option>
              <option value="ghee">ঘি ও তেল</option>
              <option value="dates">খেজুর ও বাদাম</option>
              <option value="spices">মশলা</option>
            </select>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="পছন্দের পণ্যটি খুঁজুন..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className={styles.searchButton} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>

          {/* Action Icons */}
          <div className={styles.actions} ref={moreRef}>
            <Link href="#track" className={styles.actionBtn}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              </svg>
              <span>Track Order</span>
            </Link>

            <button className={styles.actionBtn}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Sign In</span>
            </button>

            <button className={styles.actionBtn} aria-label="Wishlist">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>Wishlist</span>
              {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
            </button>

            <button className={styles.actionBtn} onClick={() => setIsCartOpen(true)} aria-label="Open Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span>Cart</span>
              {totalCartItems > 0 && <span className={styles.badge}>{totalCartItems}</span>}
            </button>

            {/* Toggle More Dropdown */}
            <button className={styles.actionBtn} onClick={() => setIsMoreOpen(!isMoreOpen)} aria-label="More options">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>More</span>
            </button>

            {/* "More" Dropdown Menu */}
            {isMoreOpen && (
              <div className={styles.moreDropdown}>
                <Link href="#about" className={styles.dropdownItem} onClick={() => setIsMoreOpen(false)}>
                  <svg className={styles.dropdownIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>About Us</span>
                </Link>
                <Link href="#wishlist" className={styles.dropdownItem} onClick={() => setIsMoreOpen(false)}>
                  <svg className={styles.dropdownIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <span>Wishlists</span>
                </Link>
                <Link href="#faqs" className={styles.dropdownItem} onClick={() => setIsMoreOpen(false)}>
                  <svg className={styles.dropdownIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <span>Faqs</span>
                </Link>
                <a href="tel:+8801313555222" className={styles.dropdownItem} onClick={() => setIsMoreOpen(false)}>
                  <svg className={styles.dropdownIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Call Us</span>
                </a>
                <a href="https://wa.me/8801313555222" target="_blank" rel="noopener noreferrer" className={styles.dropdownItem} onClick={() => setIsMoreOpen(false)}>
                  <svg className={styles.dropdownIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContent}`}>
          <div className={styles.navLinks}>
            <Link href="/combos" className={`${styles.navLink} ${pathname === '/combos' ? styles.activeNavLink : ''}`} onClick={() => setSearchQuery('')}>Combos</Link>
            <Link href="/collections/offer-zone" className={`${styles.navLink} ${pathname === '/collections/offer-zone' ? styles.activeNavLink : ''}`} onClick={() => setSearchQuery('')}>Offer Zone</Link>
            <Link href="#mango" className={styles.navLink} onClick={() => handleCategoryScroll('mango')}>Mango</Link>
            <span className={styles.navLink} style={{ cursor: 'pointer' }} onClick={() => handleCategoryScroll('honey')}>
              Honey
              <svg className={styles.navArrow} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
            <Link href="#ghee" className={styles.navLink} onClick={() => handleCategoryScroll('ghee')}>Oil & Ghee</Link>
            <span className={styles.navLink} style={{ cursor: 'pointer' }} onClick={() => handleCategoryScroll('dates')}>
              Dates
              <svg className={styles.navArrow} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }} onClick={() => handleCategoryScroll('spices')}>
              Spices
              <svg className={styles.navArrow} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }} onClick={() => handleCategoryScroll('dates')}>
              Nuts & Seeds
              <svg className={styles.navArrow} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }}>
              Beverage
              <svg className={styles.navArrow} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }}>Rice</span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }}>
              Flours & Lentils
              <svg className={styles.navArrow} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }}>Certified</span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }}>Pickle</span>
            <span className={styles.navLink} style={{ cursor: 'pointer' }}>Tabaya</span>
          </div>
          <div className={styles.hotline}>
            <svg className={styles.hotlineIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>০১৩১৩-৫৫৫২২২</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
