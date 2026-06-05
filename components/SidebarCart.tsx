'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import styles from './SidebarCart.module.css';

export default function SidebarCart() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart } = useStore();

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = cart.length > 0 ? 80 : 0; // Flat-rate shipping ৳ 80
  const grandTotal = subtotal + shippingFee;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ''}`} 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div className={`${styles.cartDrawer} ${isCartOpen ? styles.cartOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.title}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>আপনার শপিং কার্ট</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Items list */}
        <div className={styles.itemsList}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <div className={styles.emptyText}>আপনার কার্ট বর্তমানে খালি আছে।</div>
              <button className={styles.shopNowBtn} onClick={() => setIsCartOpen(false)}>কেনাকাটা শুরু করুন</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImageContainer}>
                  {/* Generate fallback premium styled item graphic inside canvas or style block, or load the generated image */}
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                </div>
                <div className={styles.itemDetails}>
                  <div>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemWeight}>{item.weight}</div>
                  </div>
                  <div className={styles.itemPriceQty}>
                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.qtyBtn} 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >-</button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn} 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                    <div className={styles.itemPrice}>৳ {(item.price * item.quantity).toLocaleString('bn-BD')}</div>
                  </div>
                </div>
                <button 
                  className={styles.removeItemBtn} 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info & checkout action */}
        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.priceRow}>
              <span>সাবটোটাল</span>
              <span>৳ {subtotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className={styles.priceRow}>
              <span>ডেলিভারি চার্জ</span>
              <span>৳ {shippingFee.toLocaleString('bn-BD')}</span>
            </div>
            <div className={styles.grandTotalRow}>
              <span>মোট পরিমাণ</span>
              <span className={styles.grandTotalAmount}>৳ {grandTotal.toLocaleString('bn-BD')}</span>
            </div>
            <button 
              className={styles.checkoutBtn} 
              onClick={() => alert(`ধন্যবাদ! আপনার ৳${grandTotal.toLocaleString('bn-BD')} মূল্যের অর্ডারটি সফলভাবে অনুকরণ করা হয়েছে।`)}
            >
              <span>চেকআউট করুন</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
