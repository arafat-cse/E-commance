'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import SidebarCart from '@/components/SidebarCart';
import Footer from '@/components/Footer';
import { useStore } from '@/context/StoreContext';
import styles from './login.module.css';

export default function LoginPage() {
  const { cart, setIsCartOpen } = useStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Credentials login states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credentialsError, setCredentialsError] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');

    // Bangladeshi phone validation (starts with 01 and 11 digits)
    const bdPhoneRegex = /^(01[3-9]\d{8})$/;
    if (!bdPhoneRegex.test(phoneNumber.trim())) {
      setPhoneError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)');
      return;
    }

    setOtpSent(true);
    setCountdown(60);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.trim().length < 4) {
      alert('ওটিপি কোডটি অন্তত ৪ সংখ্যার হতে হবে।');
      return;
    }
    alert('মোবাইল ওটিপি কোড সফলভাবে যাচাই করা হয়েছে!');
  };

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialsError('');

    if (!username.trim()) {
      setCredentialsError('মোবাইল নম্বর অথবা ইমেইল ঠিকানা লিখুন।');
      return;
    }
    if (password.length < 6) {
      setCredentialsError('পাসওয়ার্ডটি অন্তত ৬ অক্ষরের হতে হবে।');
      return;
    }

    alert('ক্রেডেন্সিয়াল দিয়ে সফলভাবে লগইন করা হয়েছে!');
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

      {/* Main Form Area */}
      <main className={styles.mainContent}>
        <div className={styles.loginCard}>
          {/* Card Header */}
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Signin</h1>
            <p className={styles.cardSubtitle}>Access your account securely</p>
          </div>

          {/* Form Columns */}
          <div className={styles.columnsContainer}>
            {/* Left Column: Login with Mobile */}
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Login With Mobile Number</h2>
              
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className={`${styles.input} ${phoneError ? styles.inputError : ''}`}
                      placeholder="01*********"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {phoneError && <span className={styles.errorText}>{phoneError}</span>}
                  </div>
                  <button type="submit" className={styles.primaryButton}>
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className={styles.form}>
                  <div className={styles.otpInfo}>
                    <span>ওটিপি কোডটি <strong>{phoneNumber}</strong> নম্বরে পাঠানো হয়েছে।</span>
                    <button 
                      type="button" 
                      className={styles.changePhoneBtn}
                      onClick={() => setOtpSent(false)}
                    >
                      নম্বর পরিবর্তন করুন
                    </button>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="otp" className={styles.label}>Verification Code</label>
                    <input
                      type="text"
                      id="otp"
                      className={styles.input}
                      placeholder="Enter verification code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                  </div>
                  <button type="submit" className={styles.primaryButton}>
                    Verify & Login
                  </button>
                  <div className={styles.resendContainer}>
                    {countdown > 0 ? (
                      <span className={styles.countdown}>কোডটি পুনরায় পাঠান ({countdown} সেকেন্ড)</span>
                    ) : (
                      <button 
                        type="button" 
                        className={styles.resendBtn}
                        onClick={() => {
                          setCountdown(60);
                          alert('নতুন ওটিপি কোড পাঠানো হয়েছে!');
                        }}
                      >
                        কোডটি পুনরায় পাঠান (Resend OTP)
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Middle Divider */}
            <div className={styles.divider}>
              <span className={styles.dividerText}>OR</span>
            </div>

            {/* Right Column: Login with Credentials */}
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Login With Credentials</h2>
              
              <form onSubmit={handleCredentialsLogin} className={styles.form}>
                {credentialsError && <div className={styles.alertError}>{credentialsError}</div>}
                
                <div className={styles.formGroup}>
                  <label htmlFor="username" className={styles.label}>Username</label>
                  <input
                    type="text"
                    id="username"
                    className={styles.input}
                    placeholder="Email or phone number"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>Password</label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className={`${styles.input} ${styles.passwordInput}`}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>Remember me</span>
                  </label>
                  <Link href="#forget" className={styles.forgotLink}>
                    Forgotten password?
                  </Link>
                </div>

                <button type="submit" className={styles.primaryButton}>
                  Login
                </button>
              </form>
            </div>
          </div>

          {/* Social Sign In */}
          <div className={styles.socialSection}>
            <div className={styles.socialDivider}>
              <span className={styles.socialDividerText}>or signin with</span>
            </div>
            
            <button className={styles.googleButton}>
              <svg className={styles.googleIcon} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
          </div>

          {/* Registration Redirection */}
          <div className={styles.registerContainer}>
            <span>Don&apos;t have any account? </span>
            <Link href="#register" className={styles.registerLink}>
              Register account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
