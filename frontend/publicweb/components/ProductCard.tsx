'use client';

import React from 'react';
import { useStore, Product } from '@/context/StoreContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, wishlist, addToCart, updateQuantity, toggleWishlist, setIsCartOpen } = useStore();

  const cartItem = cart.find((item) => item.id === product.id);
  const isWishlisted = wishlist.includes(product.id);

  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleOrderNow = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 !== 0;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        );
      } else if (i === fullStars + 1 && halfStar) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.37-3.32 2.88.88 3.78L12 15.4z"/></svg>
        );
      } else {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      {/* Product Image section */}
      <div className={styles.imageContainer}>
        {discountPercent > 0 && (
          <span className={styles.badge}>{discountPercent}% ছাড়</span>
        )}
        <button 
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>

      {/* Body details */}
      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.weight}>{product.weight}</span>

        {/* Rating info */}
        <div className={styles.ratingContainer}>
          <div className={styles.stars}>{renderStars()}</div>
          <span className={styles.reviewsCount}>({product.reviewsCount})</span>
        </div>

        {/* Price layout */}
        <div className={styles.priceContainer}>
          <span className={styles.price}>৳ {product.price.toLocaleString('bn-BD')}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>৳ {product.originalPrice.toLocaleString('bn-BD')}</span>
          )}
        </div>

        {/* Footer actions */}
        <div className={styles.footer}>
          <div className={styles.cartAction}>
            {cartItem ? (
              <div className={styles.quantitySelector}>
                <button 
                  className={styles.quantityBtn} 
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                >-</button>
                <span className={styles.quantityValue}>{cartItem.quantity} টি কার্টে</span>
                <button 
                  className={styles.quantityBtn} 
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                >+</button>
              </div>
            ) : (
              <button className={styles.addToCartBtn} onClick={() => addToCart(product)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                <span>কার্ট করুন</span>
              </button>
            )}
          </div>
          
          <button className={styles.orderBtn} onClick={handleOrderNow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M12 2v20M2 12l5-5M2 12l5 5M22 12l-5-5M22 12l-5 5"/></svg>
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}
