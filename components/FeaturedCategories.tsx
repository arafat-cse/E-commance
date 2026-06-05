'use client';

import React from 'react';
import styles from './FeaturedCategories.module.css';

interface CategoryItem {
  id: string;
  name: string;
  anchor: string;
  color: string;
  icon: React.ReactNode;
}

const categories: CategoryItem[] = [
  {
    id: 'honey',
    name: 'সুন্দরবনের মধু',
    anchor: '#honey',
    color: '#ca8a04',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        <path d="M12 7c1.5 1 2.5 3 2.5 5s-1 4-2.5 5"/>
        <path d="M12 5c-1.5 1-2.5 3-2.5 5s1 4 2.5 5"/>
      </svg>
    ),
  },
  {
    id: 'ghee',
    name: 'ঘি ও তেল',
    anchor: '#ghee',
    color: '#16a34a',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z"/>
      </svg>
    ),
  },
  {
    id: 'dates',
    name: 'খেজুর ও বাদাম',
    anchor: '#dates',
    color: '#b45309',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 0 0-9 9v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z"/>
        <path d="M9 10a3 3 0 0 0 6 0"/>
      </svg>
    ),
  },
  {
    id: 'mango',
    name: 'আম ও ফল',
    anchor: '#mango',
    color: '#ea580c',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 2a4 4 0 0 0 4 4c0-2.2-1.8-4-4-4z"/>
      </svg>
    ),
  },
  {
    id: 'spices',
    name: 'খাঁটি মশলা',
    anchor: '#spices',
    color: '#dc2626',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18H18L21 21H3L6 18Z"/>
        <path d="M12 3v11"/>
        <path d="M8 7v4"/>
        <path d="M16 7v4"/>
        <circle cx="12" cy="16" r="2"/>
      </svg>
    ),
  },
  {
    id: 'combos',
    name: 'কম্বো অফার',
    anchor: '#combos',
    color: '#2563eb',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="14" rx="2" ry="2"/>
        <path d="M12 5a3 3 0 1 0-3 3h6a3 3 0 1 0-3-3z"/>
        <path d="M12 8v14"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
      </svg>
    )
  }
];

export default function FeaturedCategories() {
  const handleClick = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>আমাদের জনপ্রিয় ক্যাটাগরি সমূহ</h2>
        <p className={styles.subtitle}>আমাদের উৎপাদিত ও সংগৃহীত খাঁটি খাদ্য পণ্য তালিকা</p>
        
        <div className={styles.categoriesWrapper}>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className={styles.categoryCard}
              onClick={() => handleClick(cat.anchor)}
            >
              <div className={styles.iconCircle} style={{ color: cat.color }}>
                <span className={styles.icon}>{cat.icon}</span>
              </div>
              <span className={styles.name}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
