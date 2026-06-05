# Frontend API Integration Guide

## 🔗 Connecting Frontend to Backend APIs

This guide explains how to integrate the Laravel backend APIs with the Next.js frontend applications.

---

## 📋 Prerequisites

1. Backend API running on `http://localhost:8000`
2. Frontend project with `axios` or `fetch` API
3. `.env.local` file configured

---

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install axios
```

### 2. Create API Client Service

**`frontend/publicweb/services/api.ts`**

```typescript
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 3. Create Service Files

**`frontend/publicweb/services/productService.ts`**

```typescript
import apiClient from './api';

export const productService = {
  /**
   * Get all products with pagination and filters
   */
  getProducts: async (params: {
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    min_price?: number;
    max_price?: number;
    sort?: string;
    order?: string;
  } = {}) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  /**
   * Get single product by ID
   */
  getProduct: async (id: string | number) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  /**
   * Get featured products
   */
  getFeatured: async () => {
    const response = await apiClient.get('/products/featured');
    return response.data;
  },

  /**
   * Get products by category
   */
  getByCategory: async (category: string, page: number = 1) => {
    const response = await apiClient.get(`/products/category/${category}`, {
      params: { page },
    });
    return response.data;
  },

  /**
   * Get all categories
   */
  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },
};
```

**`frontend/publicweb/services/authService.ts`**

```typescript
import apiClient from './api';

export const authService = {
  /**
   * Register new user
   */
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    const response = await apiClient.post('/auth/register', userData);
    
    if (response.data.data.access_token) {
      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  /**
   * Login user
   */
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials);
    
    if (response.data.data.access_token) {
      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  /**
   * Check if email exists
   */
  checkEmail: async (email: string) => {
    const response = await apiClient.get('/auth/check-email', {
      params: { email },
    });
    return response.data;
  },
};
```

**`frontend/publicweb/services/cartService.ts`**

```typescript
import apiClient from './api';

export const cartService = {
  /**
   * Get user's cart
   */
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  /**
   * Add item to cart
   */
  addToCart: async (productId: number, quantity: number = 1) => {
    const response = await apiClient.post('/cart/add', {
      product_id: productId,
      quantity,
    });
    return response.data;
  },

  /**
   * Update cart item quantity
   */
  updateItem: async (cartItemId: number, quantity: number) => {
    const response = await apiClient.put(`/cart/item/${cartItemId}`, {
      quantity,
    });
    return response.data;
  },

  /**
   * Remove item from cart
   */
  removeItem: async (cartItemId: number) => {
    const response = await apiClient.delete(`/cart/item/${cartItemId}`);
    return response.data;
  },

  /**
   * Clear entire cart
   */
  clearCart: async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
  },

  /**
   * Get cart item count
   */
  getCartCount: async () => {
    const response = await apiClient.get('/cart/count');
    return response.data;
  },
};
```

**`frontend/publicweb/services/orderService.ts`**

```typescript
import apiClient from './api';

export const orderService = {
  /**
   * Get user's orders
   */
  getOrders: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await apiClient.get('/orders', { params });
    return response.data;
  },

  /**
   * Get order details
   */
  getOrder: async (orderId: number) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },

  /**
   * Create new order
   */
  createOrder: async (orderData: {
    shipping_address: {
      name: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    };
    notes?: string;
    coupon_code?: string;
  }) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  /**
   * Cancel order
   */
  cancelOrder: async (orderId: number) => {
    const response = await apiClient.put(`/orders/${orderId}/cancel`);
    return response.data;
  },

  /**
   * Download invoice
   */
  getInvoice: async (orderId: number) => {
    const response = await apiClient.get(`/orders/${orderId}/invoice`);
    return response.data;
  },
};
```

**`frontend/publicweb/services/reviewService.ts`**

```typescript
import apiClient from './api';

export const reviewService = {
  /**
   * Get reviews for a product
   */
  getReviews: async (productId: number, page: number = 1) => {
    const response = await apiClient.get(`/products/${productId}/reviews`, {
      params: { page },
    });
    return response.data;
  },

  /**
   * Create review (authenticated)
   */
  createReview: async (productId: number, data: {
    rating: number;
    comment: string;
  }) => {
    const response = await apiClient.post(`/products/${productId}/reviews`, data);
    return response.data;
  },

  /**
   * Get my reviews
   */
  getMyReviews: async () => {
    const response = await apiClient.get('/reviews/my');
    return response.data;
  },

  /**
   * Update my review
   */
  updateReview: async (reviewId: number, data: {
    rating: number;
    comment: string;
  }) => {
    const response = await apiClient.put(`/reviews/${reviewId}`, data);
    return response.data;
  },

  /**
   * Delete review
   */
  deleteReview: async (reviewId: number) => {
    const response = await apiClient.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  /**
   * Mark review as helpful
   */
  markHelpful: async (reviewId: number) => {
    const response = await apiClient.post(`/reviews/${reviewId}/helpful`);
    return response.data;
  },
};
```

---

## 🪝 Custom Hooks

Create reusable hooks for common API operations:

**`frontend/publicweb/hooks/useProducts.ts`**

```typescript
import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';

export function useProducts(initialParams = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getProducts(initialParams);
        setProducts(response.data);
        setPagination(response.pagination);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error, pagination };
}
```

**`frontend/publicweb/hooks/useAuth.ts`**

```typescript
import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.data.user);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
}
```

---

## 📱 Usage in Components

**Example: Product Listing Component**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import ProductCard from '@/components/ProductCard';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts({ per_page: 12 });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Example: Add to Cart**

```typescript
'use client';

import { cartService } from '@/services/cartService';
import { useState } from 'react';

export default function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await cartService.addToCart(productId, 1);
      alert('Added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

---

## 🔐 Authentication Flow

### Login Flow

```typescript
// 1. User enters credentials
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authService.login({ email, password });
    
    // 2. Token is saved in localStorage
    // 3. Redirect to dashboard
    router.push('/account');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Using Protected Endpoints

```typescript
// The JWT token is automatically added to requests
const handleCheckout = async () => {
  // This will include the token automatically
  const response = await orderService.createOrder({
    shipping_address: { ... }
  });
};
```

---

## 🛡️ Error Handling

```typescript
const handleApiCall = async () => {
  try {
    const response = await productService.getProducts();
    // Handle success
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      router.push('/login');
    } else if (error.response?.status === 422) {
      // Validation error
      console.log(error.response.data.errors);
    } else if (error.response?.status === 500) {
      // Server error
      console.log('Server error occurred');
    } else {
      // Network error
      console.log('Network error');
    }
  }
};
```

---

## 📋 Common Patterns

### Pattern 1: Fetch and Display

```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetch = async () => {
    const response = await service.getItems();
    setData(response.data);
    setLoading(false);
  };
  fetch();
}, []);

if (loading) return <div>Loading...</div>;
return <div>{/* Display data */}</div>;
```

### Pattern 2: Form Submission

```typescript
const handleSubmit = async (formData) => {
  try {
    setLoading(true);
    await service.create(formData);
    alert('Success!');
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Pattern 3: Search and Filter

```typescript
const handleSearch = async (query) => {
  const response = await productService.getProducts({
    search: query,
    per_page: 12
  });
  setProducts(response.data);
};
```

---

## 🧪 Testing API Calls

### Test in Browser Console

```javascript
// Test product fetch
fetch('http://localhost:8000/api/products')
  .then(r => r.json())
  .then(d => console.log(d));

// Test with auth
fetch('http://localhost:8000/api/cart', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
})
  .then(r => r.json())
  .then(d => console.log(d));
```

### Using NextJS API Routes as Proxy (Optional)

**`frontend/publicweb/pages/api/products/route.ts`**

```typescript
export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${searchParams}`,
    { headers: request.headers }
  );

  return response;
}
```

---

## 🚀 Deployment Considerations

### Update .env for Production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

### CORS Issues

Backend needs to allow frontend domain:

```env
# .env in backend
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

---

## 📚 Full Example: Checkout Component

```typescript
'use client';

import { orderService } from '@/services/orderService';
import { cartService } from '@/services/cartService';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shipping_address: {
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Create order
      const response = await orderService.createOrder(formData);
      
      // Clear cart
      await cartService.clearCart();
      
      // Redirect to success page
      router.push(`/orders/${response.data.id}`);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}
```

---

## ✅ Checklist

- [ ] API client configured (`services/api.ts`)
- [ ] All service files created
- [ ] Authentication implemented
- [ ] Error handling setup
- [ ] JWT token stored and retrieved
- [ ] Hooks created for common operations
- [ ] Components integrated with API
- [ ] Testing completed
- [ ] .env configured correctly
- [ ] CORS settings verified

---

*Last Updated: 2026-06-05*

For more details, see [JUNIOR_DEVELOPER_GUIDE.md](./JUNIOR_DEVELOPER_GUIDE.md)
