# Laravel + Vue Project Setup

This repository contains two separate applications working together:
- **Backend** → Laravel (PHP framework) for API and business logic
- **Frontend** → Vue 3 (JavaScript framework) for user interface

---

## 📦 Dependencies

### Backend (Laravel)

**Core Requirements:**
- **Composer** `2.4.1`
- **PHP** `^8.2` 

---

### Frontend (Vue 3)

**Core Libraries:**
- **node** `23.9.0`
- **npm** `11.5.0`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
cd <your-project-folder>
```

---

### 🖥 Backend Setup (Laravel)
1. Navigate to the backend folder:
```bash
cd backend
```
2. Install PHP dependencies:
```bash
composer install
```
3. Copy environment file:
```bash
cp .env.example .env
```
4. Configure `.env` with:
   - Database connection details
   - `SANCTUM_STATEFUL_DOMAINS` (frontend URL)
5. Generate Laravel application key:
```bash
php artisan key:generate
```
6. Run database migrations:
```bash
php artisan migrate
```
7. (Optional) Seed the database:
```bash
php artisan db:seed
```
8. Start the Laravel development server:
```bash
php artisan serve
```
The backend will run on: **`http://127.0.0.1:8000`**

---

### 🌐 Frontend Setup (Vue 3)
1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install JavaScript dependencies:
```bash
npm install
```
3. Create an `.env` file with:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```
4. Start the Vue development server:
```bash
npm run dev
```
The frontend will run on: **`http://localhost:5173`**

---

## 🔗 Connecting Frontend & Backend
- Enable CORS in Laravel (`config/cors.php`) so the frontend can call backend APIs.
- Laravel Sanctum should be configured for authentication between Vue and Laravel.
- Ensure `VITE_API_BASE_URL` in the frontend `.env` matches your backend URL.

---

## ✅ Running the Project
1. **Start Backend**:
```bash
php artisan serve
```
2. **Start Frontend**:
```bash
npm run dev
```
3. Open in browser:
- Frontend → `http://localhost:5173`
- Backend → `http://127.0.0.1:8000`
