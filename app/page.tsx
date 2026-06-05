'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import SidebarCart from '@/components/SidebarCart';
import HeroSlider from '@/components/HeroSlider';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductCard from '@/components/ProductCard';
import ProductSlider from '@/components/ProductSlider';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import { productsData } from '@/data/products';
import styles from './page.module.css';

export default function Home() {
  const { searchQuery, cart, setIsCartOpen } = useStore();
  const [visibleProductsCount, setVisibleProductsCount] = useState(8);

  // Filter products for categories
  const honeyProducts = productsData.filter((p) => p.category === 'মধু (Honey)');
  const datesProducts = productsData.filter((p) => p.category === 'খেজুর ও বাদাম');
  const gheeProducts = productsData.filter((p) => p.category === 'ঘি ও তেল');
  const comboProducts = productsData.filter((p) => p.category === 'কম্বো অফার');
  
  // Best Sellers (manual filter based on best tags)
  const bestSellers = productsData.filter(
    (p) => p.tag === 'সেরা বিক্রেতা' || p.tag === 'জনপ্রিয়'
  ).slice(0, 4);

  // Search filter
  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleProductsCount((prev) => prev + 4);
  };

  const isSearching = searchQuery.trim() !== '';

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.main}>
      <Header />
      <SidebarCart />

      {/* Floating Orange Cart Tag */}
      <div className={styles.floatingCart} onClick={() => setIsCartOpen(true)}>
        <span className={styles.floatingCartIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </span>
        <span className={styles.floatingCartCount}>{totalItems} Items</span>
        <span className={styles.floatingCartPrice}>৳ {totalPrice.toLocaleString('bn-BD')}</span>
      </div>

      {/* Floating Message Support Bubble */}
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

      {isSearching ? (
        // Search Results Page
        <div className="container" style={{ padding: '2rem 1.5rem', flex: 1 }}>
          <div className={styles.searchResultsHeader}>
            <div className="container">
              <span className={styles.searchResultsText}>
                &ldquo;{searchQuery}&rdquo; এর জন্য অনুসন্ধান ফলাফল ({filteredProducts.length}টি পণ্য পাওয়া গেছে)
              </span>
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '1rem' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <h3>দুঃখিত! কোনো পণ্য পাওয়া যায়নি।</h3>
              <p>দয়া করে সঠিক বানান দিয়ে পুনরায় চেষ্টা করুন।</p>
            </div>
          ) : (
            <div className="product-grid" style={{ marginTop: '2rem' }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Standard Landing Page Layout
        <>
          {/* Split Hero Layout Container */}
          <section className={styles.heroContainer}>
            <div className={`container ${styles.heroGrid}`}>
              <HeroSlider />
              
              {/* Side static Mango card */}
              <div 
                className={styles.sideBanner}
                onClick={() => {
                  const element = document.getElementById('mango');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img src="/images/mango.png" alt="Natural Himsagar Mangoes" className={styles.sideBannerImg} />
                <div className={styles.sideBannerOverlay}>
                  <h3 className={styles.sideBannerTitle}>
                    হিমসাগর আমের<br />
                    <span className={styles.sideBannerTitleHighlight}>প্রাকৃতিক মিষ্টি স্বাদ</span>
                  </h3>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <FeaturedCategories />

          {/* Value Propositions / Key Features */}
          <section className={styles.section} style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
            <div className="container">
              <div className={styles.propsGrid}>
                <div className={styles.propCard}>
                  <div className={styles.propIconCircle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div className={styles.propInfo}>
                    <h4 className={styles.propTitle}>শতভাগ খাঁটি পণ্য</h4>
                    <p className={styles.propDesc}>সরাসরি নিজস্ব তত্ত্বাবধানে প্রস্তুতকৃত</p>
                  </div>
                </div>
                <div className={styles.propCard}>
                  <div className={styles.propIconCircle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  </div>
                  <div className={styles.propInfo}>
                    <h4 className={styles.propTitle}>ক্যাশ অন ডেলিভারি</h4>
                    <p className={styles.propDesc}>পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন</p>
                  </div>
                </div>
                <div className={styles.propCard}>
                  <div className={styles.propIconCircle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                  </div>
                  <div className={styles.propInfo}>
                    <h4 className={styles.propTitle}>সহজ রিটার্ন পলিসি</h4>
                    <p className={styles.propDesc}>৭ দিনের মধ্যে সহজ রিটার্ন সুবিধা</p>
                  </div>
                </div>
                <div className={styles.propCard}>
                  <div className={styles.propIconCircle}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div className={styles.propInfo}>
                    <h4 className={styles.propTitle}>২৪/৭ কাস্টমার সাপোর্ট</h4>
                    <p className={styles.propDesc}>যেকোনো সহায়তায় সরাসরি যোগাযোগ</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Top Selling Section */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>আমাদের সেরা বিক্রেতা পণ্যসমূহ</h2>
                <p className={styles.sectionSubtitle}>সবচেয়ে বেশি বিক্রিত ও সমাদৃত বিশুদ্ধ খাদ্যের তালিকা</p>
              </div>
              
              <div className="product-grid">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* Dual Promo Banners */}
          <section className={styles.section} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <div className="container">
              <div className={styles.promoGrid}>
                {/* Banner 1 */}
                <div 
                  className={styles.promoBanner} 
                  style={{ background: 'linear-gradient(135deg, rgba(202,138,4,0.85) 0%, rgba(133,77,14,0.95) 100%)' }}
                >
                  <div className={styles.promoContent}>
                    <span className={styles.promoBadge}>খাঁটি কালেকশন</span>
                    <h3 className={styles.promoTitle}>সুন্দরবনের চাকের মধু<br />ও মিক্সড নাট কম্বো</h3>
                    <button className={styles.promoBtn}>অর্ডার করুন</button>
                  </div>
                </div>
                {/* Banner 2 */}
                <div 
                  className={styles.promoBanner} 
                  style={{ background: 'linear-gradient(135deg, rgba(43,120,67,0.85) 0%, rgba(15,36,22,0.95) 100%)' }}
                >
                  <div className={styles.promoContent}>
                    <span className={styles.promoBadge}>ঐতিহ্যবাহী স্বাদ</span>
                    <h3 className={styles.promoTitle}>কাঠের ঘানির খাঁটি<br />সরিষার তেল ও ঘি কম্বো</h3>
                    <button className={styles.promoBtn}>সংগ্রহ করুন</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Honey Collection Slider */}
          <ProductSlider 
            id="honey"
            title="খাঁটি মধু কালেকশন" 
            subtitle="সুন্দরবন ও বিভিন্ন ফুলের সম্পূর্ণ খাঁটি ও ভেজালমুক্ত প্রাকৃতিক মধু" 
            products={honeyProducts} 
          />

          {/* Ghee & Oil Slider */}
          <ProductSlider 
            id="ghee"
            title="খাঁটি ঘি ও তেল কালেকশন" 
            subtitle="নিজস্ব তত্ত্বাবধানে তৈরি গরুর দুধের খাঁটি ঘি ও কাঠের ঘানির সরিষার তেল" 
            products={gheeProducts} 
          />

          {/* Dates & Nuts Slider */}
          <ProductSlider 
            id="dates"
            title="খেজুর ও বাদাম কালেকশন" 
            subtitle="মদীনা থেকে আমদানিকৃত মরিয়ম খেজুর ও পুষ্টিকর ড্রাই ফ্রুটস" 
            products={datesProducts} 
          />

          {/* Combo Offers Grid */}
          <section className={styles.sectionWhite} id="combos">
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>স্পেশাল কম্বো অফার</h2>
                <p className={styles.sectionSubtitle}>একত্রে আকর্ষণীয় ছাড়ে আমাদের প্রিমিয়াম কম্বো প্যাকসমূহ কিনুন</p>
              </div>
              
              <div className="product-grid">
                {comboProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* Just For You (Full Grid + Pagination) */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>আপনার জন্য পণ্য</h2>
                <p className={styles.sectionSubtitle}>স্বাস্থ্যকর ও বিশুদ্ধ দৈনন্দিন খাদ্যসামগ্রী</p>
              </div>
              
              <div className="product-grid">
                {productsData.slice(0, visibleProductsCount).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {visibleProductsCount < productsData.length && (
                <div className={styles.loadMoreContainer}>
                  <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                    আরও দেখুন
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Customer Reviews Section */}
          <CustomerReviews />

          {/* Brand Showcase Strip */}
          <section className={styles.brandShowcase}>
            <div className="container">
              <div className={styles.brandGrid}>
                <div className={styles.brandLogo}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <span>Ghorer Bazar</span>
                </div>
                <div className={styles.brandLogo}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3v19M5 12h14"/></svg>
                  <span>Khejuri</span>
                </div>
                <div className={styles.brandLogo}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
                  <span>Shosti Food</span>
                </div>
                <div className={styles.brandLogo}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><circle cx="12" cy="12" r="4"/></svg>
                  <span>Glarvest Organic</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
