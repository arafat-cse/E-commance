'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Col 1: About */}
        <div className={styles.col}>
          <div className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>ঘরের বাজার</span>
          </div>
          <p className={styles.desc}>
            ঘরের বাজার বাংলাদেশ-এর অন্যতম বিশ্বস্ত অনলাইন অর্গানিক খাদ্য সরবরাহকারী প্রতিষ্ঠান। আমরা সরাসরি কৃষকদের কাছ থেকে সেরা মানের পণ্য সংগ্রহ করে গ্রাহকদের কাছে পৌঁছে দিই।
          </p>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentBadge}>bKash</span>
            <span className={styles.paymentBadge}>Nagad</span>
            <span className={styles.paymentBadge}>Rocket</span>
            <span className={styles.paymentBadge}>Visa</span>
            <span className={styles.paymentBadge}>MasterCard</span>
            <span className={styles.paymentBadge}>COD</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.heading}>কুইক লিঙ্ক</h4>
          <ul className={styles.linksList}>
            <li>
              <Link href="/" className={styles.linkItem}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                হোম পেজ
              </Link>
            </li>
            <li>
              <Link href="#honey" className={styles.linkItem}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                মধু কালেকশন
              </Link>
            </li>
            <li>
              <Link href="#ghee" className={styles.linkItem}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                ঘি ও তেল
              </Link>
            </li>
            <li>
              <Link href="#dates" className={styles.linkItem}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                খেজুর ও বাদাম
              </Link>
            </li>
            <li>
              <Link href="#combos" className={styles.linkItem}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                কম্বো অফার
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className={styles.col}>
          <h4 className={styles.heading}>গ্রাহক সেবা</h4>
          <ul className={styles.linksList}>
            <li>
              <Link href="#about" className={styles.linkItem}>আমাদের সম্পর্কে</Link>
            </li>
            <li>
              <Link href="#terms" className={styles.linkItem}>শর্তাবলী ও নিয়মাবলী</Link>
            </li>
            <li>
              <Link href="#privacy" className={styles.linkItem}>গোপনীয়তা নীতিমালা</Link>
            </li>
            <li>
              <Link href="#refund" className={styles.linkItem}>রিফান্ড ও রিটার্ন পলিসি</Link>
            </li>
            <li>
              <Link href="#contact" className={styles.linkItem}>যোগাযোগ করুন</Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & App */}
        <div className={styles.col}>
          <h4 className={styles.heading}>যোগাযোগ</h4>
          <div className={styles.contactItem}>
            <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>রোড ৪, হাউজ ২০, মিরপুর ডিওএইচএস, ঢাকা, বাংলাদেশ</span>
          </div>
          <div className={styles.contactItem}>
            <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>support@ghorerbazar.com</span>
          </div>
          
          <div className={styles.appDownload}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>আমাদের মোবাইল অ্যাপস</span>
            <button className={styles.appBtn} aria-label="Download on Google Play">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3,5.277L14.77,17.047l2.846-2.846L3,3.003V5.277z M17.047,3.003L3.109,16.941l11.661,11.661L17.047,3.003z"/></svg>
              <div className={styles.appBtnText}>
                <span className={styles.appBtnSub}>Get it on</span>
                <span className={styles.appBtnMain}>Google Play</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottomBar}`}>
        <span>স্বত্ব © {currentYear} ঘরের বাজার লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</span>
        <div className={styles.bottomLinks}>
          <Link href="#ssl" className={styles.bottomLink}>SSL Secured</Link>
          <Link href="#dev" className={styles.bottomLink}>Developed by Antigravity AI</Link>
        </div>
      </div>
    </footer>
  );
}
