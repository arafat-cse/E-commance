'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import SidebarCart from '@/components/SidebarCart';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useStore, Product } from '@/context/StoreContext';
import { productsData } from '@/data/products';
import styles from './offer-zone.module.css';

// Helper to determine brand of a product based on its title
const getProductBrand = (product: Product): string => {
  const name = product.name.toLowerCase();
  if (name.includes('ajwa') || name.includes('mariam') || name.includes('medjool') || name.includes('khejuri') || name.includes('খেজুর')) {
    return 'Khejuri';
  } else if (name.includes('shosti')) {
    return 'Shosti Food';
  } else if (name.includes('glarvest')) {
    return 'Glarvest Organic';
  } else {
    return 'Ghorer Bazar';
  }
};

export default function OfferZonePage() {
  const { searchQuery, cart, setIsCartOpen, addToCart } = useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');

  // Filter only discounted products (originalPrice is defined and greater than price)
  const allDiscountedProducts = productsData.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  // Apply filters
  const filteredProducts = allDiscountedProducts.filter((product) => {
    // Search query filter
    const matchesSearch = searchQuery.trim() === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Price range filter
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    // Brand filter
    const brand = getProductBrand(product);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
    
    return matchesSearch && matchesPrice && matchesBrand;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else if (sortBy === 'rating-desc') {
      return b.rating - a.rating;
    }
    return 0; // 'default'
  });

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(3000);
    setSelectedBrands([]);
    setSortBy('default');
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const FilterControls = () => (
    <>
      <div className={styles.filterSection}>
        <div className={styles.filterTitle}>
          <span>মূল্য সীমা (Price)</span>
        </div>
        <div>
          <input 
            type="range" 
            min="0" 
            max="3000" 
            step="50"
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)' }}
          />
          <div className={styles.priceInputs}>
            <input 
              type="number" 
              className={styles.priceInput} 
              value={minPrice} 
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Min"
            />
            <span className={styles.priceDash}>-</span>
            <input 
              type="number" 
              className={styles.priceInput} 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterTitle}>
          <span>ব্র্যান্ড সমূহ (Brands)</span>
        </div>
        <div className={styles.filterList}>
          {['Ghorer Bazar', 'Khejuri', 'Shosti Food', 'Glarvest Organic'].map((brand) => (
            <label key={brand} className={styles.filterLabel}>
              <input 
                type="checkbox" 
                className={styles.checkbox}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <button 
          onClick={handleResetFilters}
          style={{
            width: '100%',
            padding: '0.65rem',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontWeight: '700',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(var(--primary-rgb), 0.1)',
            cursor: 'pointer'
          }}
        >
          ফিল্টার মুছুন (Reset)
        </button>
      </div>
    </>
  );

  return (
    <div className={styles.pageContainer}>
      <Header />
      <SidebarCart />

      {/* Floating Orange Cart Widget */}
      <div className={styles.floatingCart} onClick={() => setIsCartOpen(true)}>
        <span className={styles.floatingCartIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </span>
        <span className={styles.floatingCartCount}>{totalCartItems} Items</span>
        <span className={styles.floatingCartPrice}>৳ {totalPrice.toLocaleString('bn-BD')}</span>
      </div>

      {/* Floating Chat bubble */}
      <a 
        href="https://wa.me/8801313555222" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.floatingChat}
        aria-label="Contact support on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </a>

      {/* Main Page Area */}
      <main className={styles.mainContent}>
        <div className="container">
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.currentPath}>Offer Zone</span>
          </div>

          <h1 className={styles.pageTitle}>অফার জোন (Offer Zone)</h1>

          <div className={styles.layoutGrid}>
            {/* Left Sidebar (Desktop Only) */}
            <aside className={styles.sidebar}>
              <FilterControls />
            </aside>

            {/* Right Main Grid */}
            <div className={styles.contentArea}>
              {/* Toolbar */}
              <div className={styles.toolbar}>
                <span className={styles.resultsCount}>
                  মোট পণ্য: {sortedProducts.length} টি
                </span>
                
                <div className={styles.controls}>
                  <div className={styles.controlGroup}>
                    <span>সাজান:</span>
                    <select 
                      className={styles.select}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="default">ডিফল্ট</option>
                      <option value="price-asc">মূল্য: কম থেকে বেশি</option>
                      <option value="price-desc">মূল্য: বেশি থেকে কম</option>
                      <option value="rating-desc">রেটিং: বেশি থেকে কম</option>
                    </select>
                  </div>
                  
                  <button 
                    className={styles.mobileFilterBtn}
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    <span>ফিল্টার</span>
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              {sortedProducts.length === 0 ? (
                <div className={styles.noProducts}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  <div className={styles.noProductsTitle}>কোনো পণ্য খুঁজে পাওয়া যায়নি!</div>
                  <p>দয়া করে আপনার ফিল্টারের মান পরিবর্তন করুন।</p>
                </div>
              ) : (
                <div className="product-grid">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer Overlay */}
      <div 
        className={`${styles.drawerOverlay} ${isFilterOpen ? styles.drawerOverlayOpen : ''}`}
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Mobile Filter Drawer */}
      <div className={`${styles.drawer} ${isFilterOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>ফিল্টার সমূহ</span>
          <button 
            onClick={() => setIsFilterOpen(false)}
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className={styles.drawerBody}>
          <FilterControls />
        </div>
      </div>

      <Footer />
    </div>
  );
}
