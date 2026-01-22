# Name Calculator Application

A full-stack web application built with **Next.js (Frontend)** and **Laravel (Backend)**. It calculates a deterministic numerical value based on a user's name and persists data using **MySQL**.

## 📋 Objective
Develop a web application that functions as a calculator where users input their full names. The calculator's result is displayed alongside the user's name. Users can manage records via a table with options to **update** or **delete** names. Importantly, updating a user's name does **not** change the original calculator output.

## 🛠️ Tech Stack
- **Frontend**: Next.js 16 (React), Tailwind CSS, Axios, Lucide React (Icons), React Hot Toast.
- **Backend**: Laravel 11, PHP 8.x.
- **Database**: MySQL.
- **Tools**: VS Code, XAMPP (Apache/MySQL), MySQL Workbench.

## ✨ Features
### Frontend (Next.js)
- **User-Friendly & Responsive**: Modern UI built with Tailwind CSS, fully responsive across devices.
- **Input Validation**: Application restricts input to **alphabetic characters only** (no numbers or symbols allowed).
- **Error Handling**: Comprehensive error handling for invalid inputs and API failures using toast notifications.
- **REST Integration**: Seamless communication with the Laravel API.

### Backend (Laravel)
- **RESTful API**: Implements `GET`, `POST`, `PUT`, `DELETE` methods.
- **Business Logic**: 
  - **Create**: Calculates a value based on the name (Sum of alphabet positions: A=1, B=2...).
  - **Update**: Updates the full name **without** modifying the calculation result.
- **Database**: 
  - Uses **MySQL** for data storage.
  - Includes **Migrations** for schema creation.
  - Includes **Seeders** for initial dummy data.

## 📂 Project Structure
```
/
├── Frontend/          # Next.js Application
│   ├── src/
│   │   ├── app/       # App Router Pages
│   │   ├── components/# Reusable UI Components
│   │   ├── services/  # API Service Layer
│   │   └── hooks/     # Custom React Hooks
│   └── ...
├── Backend/           # Laravel Application
│   ├── app/           # Core Logic & Controllers
│   ├── database/      # Migrations & Seeders
│   ├── routes/        # API Routes
│   └── ...
└── README.md          # Project Documentation
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js & NPM
- PHP 8.2+ & Composer
- XAMPP (or simple MySQL server)

### 1. Database Setup
1. Open XAMPP and start **Apache** and **MySQL**.
2. Create a new database named `name_calculator_db` (using phpMyAdmin or MySQL Workbench).

### 2. Backend Setup
Open a terminal in the `Backend` folder:
```bash
cd Backend
```

Install PHP dependencies:
```bash
composer install
```

Configure Environment:
1. Copy the example env file: `cp .env.example .env`
2. Generate app key: `php artisan key:generate`
3. Edit `.env` to match your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=name_calculator_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

Run Migrations & Seeders:
```bash
php artisan migrate --seed --seeder=CalculationSeeder
```

Start the Server:
```bash
php artisan serve
```
*The API will run at `http://127.0.0.1:8000`.*

### 3. Frontend Setup
Open a new terminal in the `Frontend` folder:
```bash
cd Frontend
```

Install Node dependencies:
```bash
npm install
```

Start the Development Server:
```bash
npm run dev
```
*Access the application at `http://localhost:3000`.*

## 🧪 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/calculations` | Retrieve all users and results. |
| `POST` | `/api/calculations` | Create a new user (Calculates result). |
| `PUT` | `/api/calculations/{id}` | Update a user's full name (Preserves result). |
| `DELETE` | `/api/calculations/{id}` | Delete a user record. |

---
**Submission for LLIB Technical Assessment.**

