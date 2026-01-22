# Name Calculator Application

A full-stack web application built with **Next.js** (Frontend) and **Laravel** (Backend). It calculates a deterministic numerical value based on a user's name and persists data using **MySQL**.

## 📋 Objective
This application allows users to input their full names, calculates a unique result based on the sum of alphabet positions (A=1, B=2, ...), and displays the result alongside the name. Users can view, update, or delete records in a table. **Updating a user's name does not change the original calculation result.**

## 🛠️ Tech Stack
- **Frontend**: Next.js 16 (React), Tailwind CSS, Axios, Lucide React (Icons), React Hot Toast
- **Backend**: Laravel 11, PHP 8.x
- **Database**: MySQL
- **Tools**: VS Code, XAMPP (Apache/MySQL), MySQL Workbench

## ✨ Features
### Frontend (Next.js)
- **Modern & Responsive UI**: Built with Tailwind CSS, works on all devices
- **Input Validation**: Only alphabetic characters allowed (no numbers/symbols)
- **Error Handling**: Toast notifications for invalid input and API errors
- **RESTful Integration**: Communicates with Laravel backend

### Backend (Laravel)
- **RESTful API**: Supports `GET`, `POST`, `PUT`, `DELETE`
- **Business Logic**:
  - **Create**: Calculates result from name (A=1, B=2, ...)
  - **Update**: Changes name, preserves original result
- **Database**:
  - Uses MySQL for storage
  - Includes migrations and seeders for setup

## 📂 Project Structure
```
/ 
├── Frontend/          # Next.js Application
│   ├── src/
│   │   ├── app/         # App Router Pages
│   │   ├── components/  # Reusable UI Components
│   │   ├── services/    # API Service Layer
│   │   └── hooks/       # Custom React Hooks
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
- XAMPP (or any MySQL server)

### 1. Database Setup
1. Start **Apache** and **MySQL** in XAMPP
2. Create a database named `name_calculator_db` (via phpMyAdmin or MySQL Workbench)

### 2. Backend Setup (Laravel)
1. Open a terminal in the `Backend` folder:
  ```bash
  cd Backend
  ```
2. Install PHP dependencies:
  ```bash
  composer install
  ```
3. Copy the example env file and generate app key:
  ```bash
  cp .env.example .env
  php artisan key:generate
  ```
4. Edit `.env` and set your database credentials:
  ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=name_calculator_db
  DB_USERNAME=root
  DB_PASSWORD=
  ```
5. Run migrations and seeders:
  ```bash
  php artisan migrate --seed --seeder=CalculationSeeder
  ```
6. Start the Laravel server:
  ```bash
  php artisan serve
  ```
  The API will be available at `http://127.0.0.1:8000`

### 3. Frontend Setup (Next.js)
1. Open a terminal in the `Frontend` folder:
  ```bash
  cd Frontend
  ```
2. Install Node dependencies:
  ```bash
  npm install
  ```
3. Start the development server:
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:3000`

## 🧪 API Endpoints

| Method   | Endpoint                    | Description                                 |
|----------|-----------------------------|---------------------------------------------|
| `GET`    | `/api/calculations`         | Retrieve all users and results              |
| `POST`   | `/api/calculations`         | Create a new user (calculates result)       |
| `PUT`    | `/api/calculations/{id}`    | Update a user's full name (preserves result)|
| `DELETE` | `/api/calculations/{id}`    | Delete a user record                        |

---
**Submission for LLIB Technical Assessment.**

