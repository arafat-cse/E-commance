import { Product } from '@/context/StoreContext';

export const productsData: Product[] = [
  // --- Honey Collection ---
  {
    id: 'h1',
    name: 'সুন্দরবনের খলিশা ফুলের প্রাকৃতিক মধু',
    price: 1250,
    originalPrice: 1400,
    image: '/images/honey.png',
    weight: '১ কেজি',
    rating: 4.9,
    reviewsCount: 128,
    category: 'মধু (Honey)',
    tag: 'জনপ্রিয়'
  },
  {
    id: 'h2',
    name: 'প্রাকৃতিক চাকের খাঁটি মধু',
    price: 950,
    originalPrice: 1100,
    image: '/images/honey.png',
    weight: '১ কেজি',
    rating: 4.8,
    reviewsCount: 96,
    category: 'মধু (Honey)'
  },
  {
    id: 'h3',
    name: 'লিচু ফুলের প্রিমিয়াম মধু',
    price: 600,
    originalPrice: 700,
    image: '/images/honey.png',
    weight: '৫০০ গ্রাম',
    rating: 4.7,
    reviewsCount: 54,
    category: 'মধু (Honey)'
  },
  {
    id: 'h4',
    name: 'কালোজিরা ফুলের খাঁটি মধু',
    price: 950,
    image: '/images/honey.png',
    weight: '১ কেজি',
    rating: 4.9,
    reviewsCount: 88,
    category: 'মধু (Honey)',
    tag: 'সেরা বিক্রেতা'
  },

  // --- Dates & Nuts Collection ---
  {
    id: 'd1',
    name: 'প্রিমিয়াম মরিয়ম খেজুর (বাছাইকৃত)',
    price: 850,
    originalPrice: 980,
    image: '/images/dates.png',
    weight: '১ কেজি',
    rating: 4.9,
    reviewsCount: 144,
    category: 'খেজুর ও বাদাম',
    tag: 'জনপ্রিয়'
  },
  {
    id: 'd2',
    name: 'প্রিমিয়াম আজওয়া খেজুর (মদীনা)',
    price: 900,
    originalPrice: 1100,
    image: '/images/dates.png',
    weight: '১ কেজি',
    rating: 4.9,
    reviewsCount: 112,
    category: 'খেজুর ও বাদাম'
  },
  {
    id: 'd3',
    name: 'স্পেশাল মিক্সড নাট (ড্রাই ফ্রুটস সহ)',
    price: 950,
    originalPrice: 1150,
    image: '/images/nuts.png',
    weight: '৫০০ গ্রাম',
    rating: 4.8,
    reviewsCount: 78,
    category: 'খেজুর ও বাদাম',
    tag: 'সেরা বিক্রেতা'
  },
  {
    id: 'd4',
    name: 'প্রিমিয়াম কাজুবাদাম (কাঁচা)',
    price: 550,
    image: '/images/nuts.png',
    weight: '৪০০ গ্রাম',
    rating: 4.6,
    reviewsCount: 42,
    category: 'খেজুর ও বাদাম'
  },

  // --- Ghee & Oil Collection ---
  {
    id: 'g1',
    name: 'খাঁটি গাওয়া ঘি (গরুর দুধের সরের)',
    price: 1600,
    originalPrice: 1800,
    image: '/images/ghee.png',
    weight: '১ কেজি',
    rating: 4.9,
    reviewsCount: 232,
    category: 'ঘি ও তেল',
    tag: 'সেরা বিক্রেতা'
  },
  {
    id: 'g2',
    name: 'কাঠের ঘানির খাঁটি সরিষার তেল',
    price: 320,
    originalPrice: 380,
    image: '/images/oil.png',
    weight: '১ লিটার',
    rating: 4.8,
    reviewsCount: 185,
    category: 'ঘি ও তেল',
    tag: 'জনপ্রিয়'
  },
  {
    id: 'g3',
    name: 'এক্সট্রা ভার্জিন কোল্ড-প্রেসড নারিকেল তেল',
    price: 490,
    image: '/images/oil.png',
    weight: '৫০০ মিলি',
    rating: 4.7,
    reviewsCount: 39,
    category: 'ঘি ও তেল'
  },
  {
    id: 'g4',
    name: 'খাঁটি কালোজিরা তেল (কাঠের ঘানি)',
    price: 400,
    originalPrice: 480,
    image: '/images/oil.png',
    weight: '২০০ মিলি',
    rating: 4.8,
    reviewsCount: 64,
    category: 'ঘি ও তেল'
  },

  // --- Spices & Others ---
  {
    id: 's1',
    name: 'প্রিমিয়াম মরিচ গুঁড়া (খাঁটি)',
    price: 220,
    image: '/images/oil.png',
    weight: '২৫০ গ্রাম',
    rating: 4.6,
    reviewsCount: 51,
    category: 'মশলা'
  },
  {
    id: 's2',
    name: 'খাঁটি হলুদ গুঁড়া (বাছাইকৃত হলুদ)',
    price: 180,
    image: '/images/oil.png',
    weight: '২৫০ গ্রাম',
    rating: 4.7,
    reviewsCount: 48,
    category: 'মশলা'
  },
  {
    id: 's3',
    name: 'অর্গানিক পিঙ্ক সল্ট (হিমালয়ান)',
    price: 240,
    originalPrice: 300,
    image: '/images/nuts.png',
    weight: '৫০০ গ্রাম',
    rating: 4.9,
    reviewsCount: 72,
    category: 'মশলা'
  },

  // --- Combo Offers ---
  {
    id: 'cb1',
    name: 'Sundarban Honey (Half Kg) & African Honey Sachet Combo',
    price: 1500,
    originalPrice: 1682,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.8,
    reviewsCount: 45,
    category: 'কম্বো অফার',
    tag: '১০.৮% ছাড়'
  },
  {
    id: 'cb2',
    name: 'Sundarban Honey (1 Kg) & African Honey Sachet Combo',
    price: 2600,
    originalPrice: 2932,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.9,
    reviewsCount: 62,
    category: 'কম্বো অফার',
    tag: '১১.৩% ছাড়'
  },
  {
    id: 'cb3',
    name: 'Jumbo Premium Ajwa & Black Seed Honey Sachet Combo',
    price: 2700,
    originalPrice: 2860,
    image: '/images/dates.png',
    weight: '১ সেট',
    rating: 4.9,
    reviewsCount: 38,
    category: 'কম্বো অফার',
    tag: '৫.৬% ছাড়'
  },
  {
    id: 'cb4',
    name: 'Premium Ajwa & Black Seed Honey Sachet Combo',
    price: 2400,
    originalPrice: 2560,
    image: '/images/dates.png',
    weight: '১ সেট',
    rating: 4.8,
    reviewsCount: 29,
    category: 'কম্বো অফার',
    tag: '৬.৩% ছাড়'
  },
  {
    id: 'cb5',
    name: 'Jumbo Medjool & Lychee Honey Sachet Combo',
    price: 2500,
    originalPrice: 2740,
    image: '/images/dates.png',
    weight: '১ সেট',
    rating: 4.9,
    reviewsCount: 51,
    category: 'কম্বো অফার',
    tag: '৮.৮% ছাড়'
  },
  {
    id: 'cb6',
    name: 'Large Medjool & Lychee Honey Sachet Combo',
    price: 2200,
    originalPrice: 2440,
    image: '/images/dates.png',
    weight: '১ সেট',
    rating: 4.7,
    reviewsCount: 34,
    category: 'কম্বো অফার',
    tag: '৯.৮% ছাড়'
  },
  {
    id: 'cb7',
    name: 'Kashmiri Sidr Honey & Black Seed Honey Sachet Combo',
    price: 2100,
    originalPrice: 2360,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.8,
    reviewsCount: 41,
    category: 'কম্বো অফার',
    tag: '১১.০% ছাড়'
  },
  {
    id: 'cb8',
    name: 'Lychee Flower Honey (1 kg) & Black Seed Honey Sachet Combo',
    price: 1400,
    originalPrice: 1560,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.7,
    reviewsCount: 23,
    category: 'কম্বো অফার',
    tag: '১০.৩% ছাড়'
  },
  {
    id: 'cb9',
    name: 'Black Seed Honey (1 Kg) & Lychee Honey Sachet Combo',
    price: 1600,
    originalPrice: 1840,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.8,
    reviewsCount: 57,
    category: 'কম্বো অফার',
    tag: '১৩.০% ছাড়'
  },
  {
    id: 'cb10',
    name: 'Black Seed Honey (Half Kg) & Lychee Honey Sachet Combo',
    price: 900,
    originalPrice: 1040,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.8,
    reviewsCount: 48,
    category: 'কম্বো অফার',
    tag: '১৩.৫% ছাড়'
  },
  {
    id: 'cb11',
    name: 'African Honey (1 Kg) & Sundarban Honey Sachet Combo',
    price: 2600,
    originalPrice: 2932,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.9,
    reviewsCount: 31,
    category: 'কম্বো অফার',
    tag: '১১.৩% ছাড়'
  },
  {
    id: 'cb12',
    name: 'African Honey (Half Kg) & Sundarban Honey Sachet Combo',
    price: 1500,
    originalPrice: 1682,
    image: '/images/honey.png',
    weight: '১ সেট',
    rating: 4.8,
    reviewsCount: 22,
    category: 'কম্বো অফার',
    tag: '১০.৮% ছাড়'
  }
];
