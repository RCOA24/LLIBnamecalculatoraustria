# Name Calculator Application

A full-stack web application built with **Laravel (Backend)** and **React (Frontend)**. It calculates a result based on the user's name and persists data using MySQL.

## 📂 Project Structure
- **Frontend:** React + Vite
- **Backend:** Laravel API

## 🚀 Prerequisites
- PHP 8.x
- Composer
- Node.js & NPM
- XAMPP (MySQL)

---

## 🛠️ Setup Instructions

### 1. Database Setup
1. Open XAMPP and start **Apache** and **MySQL**.
2. Create a new database named `name_calculator_db` in phpMyAdmin.

### 2. Backend Setup (Laravel)
Open a terminal in the `Backend` folder:
```bash
cd Backend
cp .env.example .env
# Configure .env: DB_DATABASE=name_calculator_db
php artisan key:generate
php artisan migrate --seed --seeder=CalculationSeeder
php artisan serve

