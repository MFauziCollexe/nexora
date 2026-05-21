# Nexora

A full-stack web application built with Laravel (backend) + Next.js (frontend).

## 📁 Project Structure

```
Nexora/
├── nexora-api/          # Laravel 12 + Inertia.js + Vue.js SSR
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── bootstrap/
│   ├── .env
│   └── ...
└── nexora-web/           # Next.js 16 + React + Tailwind v4 + TypeScript
    ├── app/
    ├── public/
    ├── .env.local
    └── ...
```

### Start Laravel Backend
```powershell
cd C:\xampp\htdocs\Nexora\nexora-api
php artisan serve
```

### Start Next.js Frontend
```powershell
cd C:\xampp\htdocs\Nexora\nexora-web
npm run dev
```

## 🚀 Quick Start

### Prerequisites
- PHP 8.2+, Composer
- Node.js 18+, npm
- MySQL (via XAMPP)
- Apache (via XAMPP, optional: for domain/htdocs access)

### Start Laravel Backend
```powershell
cd C:\xampp\htdocs\Nexora\laravel-backend
php artisan serve
```
> Runs on `http://localhost:8000`

### Start Next.js Frontend
```powershell
cd C:\xampp\htdocs\Nexora\nextjs-frontend
npm run dev
```
> Runs on `http://localhost:3001`

### Start MySQL
Ensure XAMPP MySQL is running (port `3306`).

### Database
Database name: **nexora_db**

## 🔗 API Routing

Next.js frontend communicates with Laravel backend via REST API.
- Base URL: `http://localhost:8000` (configured in `.env.local`)
- CORS is configured in `nexora-api/.env` (`CORS_ALLOWED_ORIGINS`)

## 📦 Tech Stack

### Backend (Laravel 12)
- Laravel Framework 12.x
- Laravel Breeze (auth scaffolding)
- Laravel Sanctum (API auth)
- Inertia.js + Vue.js (SSR-capable)
- MySQL database

### Frontend (Next.js 16)
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Turbopack

## 📝 Notes

- MySQL XAMPP credentials: `root` / empty password
- Laravel Breeze Vue scaffolding (auth, dashboard, profile) is pre-installed
- To add Breeze API scaffold: `php artisan breeze:install api`

## ⚡ Available Commands

```powershell
# Backend
cd nexora-api
php artisan serve        # Start dev server
php artisan migrate      # Run migrations
php artisan make:model   # Create model
php artisan make:controller   # Create controller

# Frontend
cd nexora-web
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
```
