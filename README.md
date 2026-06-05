# E-Commerce Platform - Complete Setup Guide

## 🎯 Project Overview

A full-stack e-commerce platform with:
- **Admin Panel** (Next.js 15) - Dashboard for managing the platform
- **Public Website** (Next.js 15) - Customer-facing storefront
- **Backend API** (Laravel 11) - RESTful API with business logic

---

## 📁 Project Structure

```
E-commance/
├── ROADMAP.md                  # Main project roadmap
├── README.md                   # This file
├── AGENTS.md                   # Agent configuration
├── CLAUDE.md                   # Claude AI instructions
├── package.json               # Root package (monorepo)
│
├── frontend/
│   ├── adminpanel/            # Admin Dashboard
│   │   ├── README.md          # Admin setup guide
│   │   ├── ROADMAP.md         # Admin roadmap
│   │   ├── package.json
│   │   ├── app/               # Next.js 15 app directory
│   │   ├── components/        # React components
│   │   ├── services/          # API services
│   │   └── ...
│   │
│   └── publicweb/             # Customer Website
│       ├── README.md          # Public web setup guide
│       ├── ROADMAP.md         # Public web roadmap
│       ├── package.json
│       ├── app/               # Next.js 15 app directory
│       ├── components/        # React components
│       ├── services/          # API services
│       └── ...
│
└── backend/                   # Laravel API
    ├── README.md              # Backend setup guide
    ├── ROADMAP.md             # Backend roadmap
    ├── composer.json          # PHP dependencies
    ├── .env.example           # Environment template
    ├── app/                   # Laravel app
    ├── routes/                # API routes
    ├── database/              # Migrations & seeds
    └── ...
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have installed:
- **Node.js** 18.17+ (for frontend)
- **npm** or **yarn** (for frontend)
- **PHP** 8.2+ (for backend)
- **Composer** (for backend)
- **MySQL** 8.0+ (for database)
- **Git** (for version control)

### Setup Steps

#### 1. Clone and Navigate to Project

```bash
cd E-commance
```

#### 2. Setup Frontend - Public Website

```bash
cd frontend/publicweb

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Configure .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
# NEXT_PUBLIC_ADMIN_PANEL_URL=http://localhost:3001
# NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Start development server
npm run dev
# Public website: http://localhost:3000
```

#### 3. Setup Frontend - Admin Panel

```bash
cd frontend/adminpanel

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Configure .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api
# NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
# NEXT_PUBLIC_PUBLIC_WEBSITE_URL=http://localhost:3000

# Start development server
npm run dev
# Admin panel: http://localhost:3001
```

#### 4. Setup Backend - Laravel API

```bash
cd backend

# Install dependencies
composer install

# Create environment file
cp .env.example .env

# Generate keys
php artisan key:generate
php artisan jwt:secret

# Create database
mysql -u root -p
CREATE DATABASE ecommerce;
EXIT;

# Configure .env with database credentials
# DB_HOST=127.0.0.1
# DB_DATABASE=ecommerce
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed

# Start development server
php artisan serve
# API: http://localhost:8000/api
```

---

## 🔄 Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                   Public Website                        │
│              (Next.js - Customer facing)               │
│  - Browse products, shopping cart, checkout, reviews   │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ API Calls
                         │
┌─────────────────────────▼────────────────────────────────┐
│                   Laravel Backend API                    │
│              (RESTful API - Business Logic)             │
│  - Authentication, Products, Orders, Payments, Reviews  │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ Database Queries
                         │
┌────────────────────────▼────────────────────────────────┐
│                    MySQL Database                        │
│  - Users, Products, Categories, Orders, Reviews, etc    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    Admin Panel                          │
│              (Next.js - Admin management)              │
│  - Manage products, orders, customers, analytics       │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ API Calls (same as public web)
                         │
         ┌───────────────┴───────────────┐
         │                               │
    Laravel Backend API          ←→      MySQL Database
```

---

## 📋 Development Roadmap

### Phase 1: Foundation (Week 1)
- [x] Project structure setup
- [x] Create comprehensive roadmaps
- [ ] Initialize Next.js projects
- [ ] Initialize Laravel project
- [ ] Setup authentication

### Phase 2: Core Features (Week 2-3)
- [ ] Product management
- [ ] Shopping cart
- [ ] Order processing
- [ ] User accounts
- [ ] Reviews & ratings

### Phase 3: Integration (Week 4)
- [ ] Connect frontend to backend
- [ ] Implement payment processing
- [ ] Setup email notifications
- [ ] Performance optimization

### Phase 4: Deployment (Week 5)
- [ ] Testing & QA
- [ ] Security review
- [ ] Deployment preparation
- [ ] Production launch

---

## 🛠️ Technology Stack

### Frontend (Public Website & Admin Panel)
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Context API / Redux
- **API Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Charts**: Recharts (admin only)

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.2+
- **Authentication**: JWT (Tymon)
- **Database**: MySQL 8.0+
- **API**: RESTful
- **Validation**: Laravel Validation

### DevOps & Deployment
- **Version Control**: Git
- **Frontend Hosting**: Vercel / Netlify
- **Backend Hosting**: Heroku / Cloud Provider
- **Database**: Managed MySQL / AWS RDS
- **CI/CD**: GitHub Actions

---

## 🔑 Key Files & Documentation

### Root Level
- `ROADMAP.md` - Overall project roadmap
- `README.md` - This file
- `AGENTS.md` - AI agent configuration
- `CLAUDE.md` - Claude AI instructions

### Frontend - Public Website
- `frontend/publicweb/README.md` - Setup & getting started
- `frontend/publicweb/ROADMAP.md` - Detailed roadmap
- `frontend/publicweb/package.json` - Dependencies

### Frontend - Admin Panel
- `frontend/adminpanel/README.md` - Setup & getting started
- `frontend/adminpanel/ROADMAP.md` - Detailed roadmap
- `frontend/adminpanel/package.json` - Dependencies

### Backend
- `backend/README.md` - Setup & getting started
- `backend/ROADMAP.md` - Detailed roadmap
- `backend/composer.json` - PHP dependencies
- `backend/.env.example` - Environment template

---

## 📝 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints
```
POST   /auth/register      - Register new user
POST   /auth/login         - Login user
POST   /auth/logout        - Logout
GET    /auth/me            - Current user
POST   /auth/refresh       - Refresh token
```

### Product Endpoints (Public)
```
GET    /products           - List products
GET    /products/{id}      - Product details
GET    /products/search    - Search products
GET    /categories         - List categories
GET    /products/{id}/reviews - Product reviews
```

### Shopping Endpoints (Authenticated)
```
GET    /cart               - Get cart
POST   /cart/add           - Add to cart
PUT    /cart/update        - Update cart
DELETE /cart/item/{id}     - Remove from cart
POST   /orders             - Create order
GET    /orders             - User orders
GET    /orders/{id}        - Order details
```

### Admin Endpoints (Admin Only)
```
GET    /products           - List all products
POST   /products           - Create product
PUT    /products/{id}      - Update product
DELETE /products/{id}      - Delete product
GET    /customers          - List customers
GET    /orders             - All orders
```

For detailed API documentation, see each section's README.

---

## 🔐 Environment Variables

### Public Website (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_ADMIN_PANEL_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Admin Panel (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
NEXT_PUBLIC_PUBLIC_WEBSITE_URL=http://localhost:3000
```

### Backend (.env)
```env
APP_NAME="E-Commerce API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=your-secret-here
JWT_ALGORITHM=HS256
JWT_EXPIRES_IN=1440

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

## 📦 Useful Commands

### Frontend (Both Admin & Public)
```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Code quality
npm run lint
npm run format
npm run type-check
```

### Backend
```bash
# Development
php artisan serve

# Database
php artisan migrate
php artisan migrate:refresh
php artisan db:seed

# Testing
php artisan test

# Cache
php artisan cache:clear
php artisan config:cache

# Tinker (REPL)
php artisan tinker
```

---

## 🚨 Troubleshooting

### Frontend Issues

**Port Already in Use**
```bash
# Change port
npm run dev -- -p 3002
```

**Module Not Found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**API Connection Error**
- Ensure backend is running on `http://localhost:8000`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check browser console for CORS errors

### Backend Issues

**Database Connection Error**
```bash
# Verify MySQL is running
# Check .env database settings
# Ensure database exists
mysql -u root -p
SHOW DATABASES;
```

**Composer Dependency Error**
```bash
composer clear-cache
composer update
```

**Port 8000 Already in Use**
```bash
php artisan serve --port=8001
```

---

## 🔄 Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Make Changes**
   - Update code
   - Test locally
   - Follow code style

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add feature description"
   ```

4. **Push to Repository**
   ```bash
   git push origin feature/feature-name
   ```

5. **Create Pull Request**
   - Request review
   - Make requested changes
   - Merge when approved

---

## 📚 Resources & Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Laravel 11 Docs](https://laravel.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🎯 Next Steps

1. ✅ Read this README
2. ✅ Review the ROADMAP.md
3. 🔄 Set up your local environment
4. 🔄 Start with backend setup
5. 🔄 Setup public website
6. 🔄 Setup admin panel
7. 🔄 Connect frontend to backend
8. 🔄 Implement features

---

## 📞 Support

For issues and questions:
1. Check the detailed README in each section (frontend/publicweb, frontend/adminpanel, backend)
2. Review the ROADMAP files for guidance
3. Check browser console for frontend errors
4. Check server logs for backend errors
5. Refer to official documentation

---

## 📄 License

MIT License - Feel free to use this project

---

## 👥 Contributors

Your Name - Initial work

---

*Last Updated: 2026-06-05*

For more details, please refer to:
- [Main Roadmap](./ROADMAP.md) - Overall project roadmap
- [Public Website Guide](./frontend/publicweb/README.md) - Customer website setup
- [Admin Panel Guide](./frontend/adminpanel/README.md) - Admin dashboard setup
- [Backend Guide](./backend/README.md) - API setup
