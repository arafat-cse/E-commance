'use client';

import React, { useRef } from 'react';
import styles from './CustomerReviews.module.css';

interface ReviewData {
  id: number;
  name: string;
  initials: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: ReviewData[] = [
  {
    id: 1,
    name: 'মোস্তাফিজুর রহমান',
    initials: 'মর',
    location: 'মিরপুর, ঢাকা',
    rating: 5,
    comment: 'ঘরের বাজারের সুন্দরবনের প্রাকৃতিক চাকের মধু আসলেই অসাধারণ! আমি নিজে ল্যাবে টেস্ট করিয়ে দেখেছি, কোনো ভেজাল নেই। স্বাদ ও সুঘ্রাণ একদম খাঁটি মধুর মতো।',
    date: '২ সপ্তাহ আগে',
  },
  {
    id: 2,
    name: 'নুসরাত জাহান',
    initials: 'নজ',
    location: 'সিরাজগঞ্জ',
    rating: 5,
    comment: 'আমি ঘি কিনে অনেক জায়গায় প্রতারিত হয়েছি। কিন্তু ঘরের বাজারের গাওয়া ঘি সত্যি খাঁটি গরুর দুধের সর থেকে প্রস্তুতকৃত। এর সুবাস পুরো ঘরে ছড়িয়ে পড়ে রান্নার সময়।',
    date: '১ মাস আগে',
  },
  {
    id: 3,
    name: 'তারিকুল ইসলাম',
    initials: 'তা',
    location: 'হালিশহর, চট্টগ্রাম',
    rating: 5,
    comment: 'মরিয়ম খেজুরগুলো খুবই ফ্রেশ ও প্রিমিয়াম ছিল। কোনো ধুলাবালি বা ময়লা ছিল না। ডেলিভারি খুবই ফাস্ট পেয়েছি, ঢাকার বাইরে ২ দিনে অর্ডার পৌঁছে গিয়েছে!',
    date: '৩ সপ্তাহ আগে',
  },
  {
    id: 4,
    name: 'সুলতানা রাজিয়া',
    initials: 'সু',
    location: 'উপশহর, সিলেট',
    rating: 5,
    comment: 'আমার ডায়াবেটিক বাবার জন্য তাদের কাঠের ঘানির সরিষার তেল ও কালোজিরার তেল নিয়েছিলাম। কোয়ালিটি নিয়ে কোনো প্রশ্ন তোলার সুযোগ নেই। অত্যন্ত যত্নসহকারে প্যাক করা ছিল।',
    date: '১ মাস আগে',
  }
];

export default function CustomerReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      );
    }
    return stars;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>গ্রাহকদের মূল্যবান মতামত</h2>
        <p className={styles.subtitle}>আমাদের পণ্য ও সেবা সম্পর্কে সম্মানিত ক্রেতাদের প্রতিক্রিয়া</p>

        <div className={styles.sliderWrapper}>
          {/* Navigation Controls */}
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={() => scroll('left')} aria-label="Slide left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={() => scroll('right')} aria-label="Slide right">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Testimonial container */}
          <div className={styles.viewport}>
            <div 
              className={styles.track} 
              ref={scrollRef}
              style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
            >
              {reviews.map((rev) => (
                <div key={rev.id} className={styles.reviewCard}>
                  <div className={styles.ratingRow}>
                    <div className={styles.stars}>{renderStars(rev.rating)}</div>
                    <span className={styles.quoteIcon}>“</span>
                  </div>
                  
                  <p className={styles.comment}>{rev.comment}</p>
                  
                  <div className={styles.userProfile}>
                    <div className={styles.avatar}>{rev.initials}</div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>
                        <span>{rev.name}</span>
                        <span className={styles.verifiedBadge} title="Verified Buyer">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </span>
                      </div>
                      <div className={styles.userMeta}>
                        <span>{rev.location}</span> • <span>{rev.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
