'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './HeroSlider.module.css';

interface SlideData {
  id: number;
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  backgroundGradient: string;
  accentColor: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    badge: '১০০% খাঁটি ও প্রাকৃতিক',
    title: 'সুন্দরবনের প্রাকৃতিক ',
    titleHighlight: 'চাকের মধু',
    description: 'আমাদের সংগ্রহ করা মধু সরাসরি সুন্দরবনের প্রাকৃতিক মৌচাক থেকে বিশ্বস্ত উপায়ে সংগৃহীত, যা সম্পূর্ণ কেমিক্যালমুক্ত ও প্রাকৃতিক গুণাবলীতে ভরপুর।',
    buttonText: 'অর্ডার করুন',
    backgroundGradient: 'linear-gradient(135deg, #fefbe8 0%, #fef08a 60%, #eab308 100%)',
    accentColor: '#ca8a04',
  },
  {
    id: 2,
    badge: 'প্রিমিয়াম কোয়ালিটি খেজুর',
    title: 'সরাসরি মদীনা থেকে আমদানিকৃত ',
    titleHighlight: 'মরিয়ম খেজুর',
    description: 'সৌদি আরবের মদীনা থেকে আমদানিকৃত শতভাগ প্রিমিয়াম ও ধুলোবালি মুক্ত বাছাইকৃত মরিয়ম খেজুর, যা আপনার শরীরের ক্লান্তি দূর করে দ্রুত শক্তি জোগাতে সাহায্য করবে।',
    buttonText: 'সংগ্রহ করুন',
    backgroundGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 60%, #f97316 100%)',
    accentColor: '#ea580c',
  },
  {
    id: 3,
    badge: 'ঐতিহ্যবাহী গাওয়া ঘি',
    title: 'শতভাগ বিশুদ্ধ ও সুগন্ধিযুক্ত ',
    titleHighlight: 'গাওয়া ঘি',
    description: 'সিরাজগঞ্জের খাঁটি গরুর দুধের সর থেকে নিজস্ব তত্ত্বাবধানে ঐতিহ্যবাহী পদ্ধতিতে তৈরি ঘরে প্রস্তুতকৃত ঘি অত্যন্ত সুস্বাদু ও পুষ্টিগুণে অতুলনীয়।',
    buttonText: 'কিনুন এখনই',
    backgroundGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 60%, #22c55e 100%)',
    accentColor: '#16a34a',
  }
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.sliderContainer}>
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={slide.id}
              className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
            >
              {/* Background gradient layout */}
              <div 
                className={styles.slideBg} 
                style={{ background: slide.backgroundGradient }}
              />
              
              <div className={styles.slideContentContainer}>
                <div className={styles.slideContent}>
                  <span className={styles.badge} style={{ color: slide.accentColor, backgroundColor: `${slide.accentColor}15` }}>
                    {slide.badge}
                  </span>
                  <h1 className={styles.title}>
                    {slide.title}
                    <span className={styles.titleHighlight} style={{ color: slide.accentColor }}>{slide.titleHighlight}</span>
                  </h1>
                  <p className={styles.description}>
                    {slide.description}
                  </p>
                  <button className={styles.ctaButton} style={{ backgroundColor: slide.accentColor, color: '#ffffff', boxShadow: `0 8px 20px ${slide.accentColor}40` }}>
                    <span>{slide.buttonText}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Arrow Navigation */}
        <button 
          className={`${styles.arrowBtn} ${styles.prevArrow}`} 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button 
          className={`${styles.arrowBtn} ${styles.nextArrow}`} 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        {/* Bottom Dot Indicators */}
        <div className={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeSlide ? styles.dotActive : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
