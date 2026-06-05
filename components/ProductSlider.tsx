'use client';

import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/context/StoreContext';
import styles from './ProductSlider.module.css';

interface ProductSliderProps {
  title: string;
  subtitle: string;
  products: Product[];
  id?: string;
}

export default function ProductSlider({ title, subtitle, products, id }: ProductSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.section} id={id}>
      <div className="container">
        {/* Slider Header */}
        <div className={styles.headerRow}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          
          <div className={styles.navControls}>
            <button 
              className={styles.navBtn} 
              onClick={() => scroll('left')}
              aria-label="Slide left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scroll('right')}
              aria-label="Slide right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* Slider Viewport */}
        <div className={styles.viewport}>
          <div 
            className={styles.track} 
            ref={scrollContainerRef}
            style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.slideItem}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
