# Hasthiya Project Tracker

A full-stack project management dashboard built with MERN stack (MySQL, Express, React, Node.js) using TypeScript and Vite.

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Axios (HTTP client)
- React Router DOM (Routing)

**Backend:**
- Node.js with Express.js
- TypeScript
- MySQL (Database)
- mysql2 (MySQL driver)

## ✨ Features

✅ **CRUD Operations**: Create, Read, Update, Delete projects  
✅ **Project Status Management**: Pending, In Progress, Completed  
✅ **Search Functionality**: Search projects by name or description  
✅ **Filter by Status**: Filter projects by their current status  
✅ **Due Date Tracking**: Automatic overdue project highlighting  
✅ **Dashboard Summary**: Visual statistics cards  
✅ **Responsive Design**: Works on mobile, tablet, and desktop  
✅ **Toast Notifications**: User feedback for all actions  
✅ **Form Validation**: Frontend and backend validation  

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **MySQL** (v8.0 or higher)
   - Download: https://dev.mysql.com/downloads/installer/
   - Verify: `mysql --version`

3. **Git** (for cloning the repository)
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

## 🚀 Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/SuviniMayadunna/SuviniMayadunna-HasthiyaTracker

```

### Step 2: Setup MySQL Database

1. **Start MySQL Server**
   - Windows: MySQL should start automatically, or use MySQL Workbench
   - Mac/Linux: `sudo service mysql start`

2. **Login to MySQL** (use your MySQL root password)
   ```bash
   mysql -u root -p
   ```

3. **Verify MySQL is running** (in MySQL shell)
   ```sql
   SHOW DATABASES;
   EXIT;
   ```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Configure Backend Environment

1. **Copy the example environment file:**
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux use: `cp .env.example .env`)

2. **Edit the `.env` file** with your MySQL credentials:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD="your_mysql_password_here"
   DB_NAME=hasthiya_tracker
   DB_PORT=3306

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

   **Important:** 
   - Replace `your_mysql_password_here` with your actual MySQL root password
   - If your password has special characters, keep it in quotes

### Step 5: Initialize the Database

This command will create the database and tables automatically:

```bash
npm run init-db
```

You should see:
```
✅ Database created successfully
✅ Projects table created successfully
Database initialization completed!
```

### Step 6: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 7: Configure Frontend Environment

1. **Copy the example environment file:**
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux use: `cp .env.example .env`)

2. **The `.env` file should contain:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
⚡ Server running on port 5000
✅ Database connected successfully
```

Backend will be running at: **http://localhost:5000**

### Start Frontend Server (in a new terminal)

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

Frontend will be running at: **http://localhost:3000**

### Access the Application

Open your browser and navigate to:
- **Home Page**: http://localhost:3000/
- **Dashboard**: http://localhost:3000/dashboard

## 📁 Project Structure

```
HasthiyaTracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts          # MySQL connection pool
│   │   │   └── initDatabase.ts      # Database initialization script
│   │   ├── controllers/
│   │   │   └── projectController.ts # Business logic for projects
│   │   ├── routes/
│   │   │   └── projectRoutes.ts     # API route definitions
│   │   ├── types/
│   │   │   └── project.ts           # TypeScript interfaces
│   │   └── server.ts                # Express server setup
│   ├── .env                         # Environment variables (not in git)
│   ├── .env.example                 # Example environment file
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.tsx           # Reusable button component
│   │   │   ├── Modal.tsx            # Modal dialog component
│   │   │   ├── Toast.tsx            # Notification component
│   │   │   ├── ProjectCard.tsx      # Individual project card
│   │   │   ├── ProjectList.tsx      # Project grid layout
│   │   │   ├── ProjectForm.tsx      # Create/Edit form
│   │   │   ├── Hero.tsx             # Landing page hero
│   │   │   └── Features.tsx         # Features section
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Landing page
│   │   │   └── Dashboard.tsx        # Main dashboard
│   │   ├── services/
│   │   │   └── projectApi.ts        # API service layer
│   │   ├── types/
│   │   │   └── project.ts           # TypeScript interfaces
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables (not in git)
│   ├── .env.example                 # Example environment file
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md                        # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Get all projects |
| GET | `/projects/:id` | Get project by ID |
| POST | `/projects` | Create new project |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

### Example API Request (Create Project)

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Project",
    "description": "Project description",
    "status": "Pending",
    "due_date": "2026-12-31"
  }'
```

## 🐛 Troubleshooting

### MySQL Connection Error

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**
1. Verify your MySQL password is correct
2. Check the `.env` file in the `backend` folder
3. Make sure password is in quotes if it contains special characters

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Kill the process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```
2. Or change the port in `backend/.env`

### Database Not Found

**Error:** `Unknown database 'hasthiya_tracker'`

**Solution:**
Run the database initialization script:
```bash
cd backend
npm run init-db
```

### Frontend Build Errors

**Error:** `Module not found` or dependency issues

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Create Project**
   - Click "+ New Project"
   - Fill in all fields
   - Verify project appears in the list

2. **Edit Project**
   - Click "Edit" on any project
   - Change status or other fields
   - Verify changes are saved

3. **Delete Project**
   - Click "Delete" on any project
   - Confirm deletion
   - Verify project is removed

4. **Search**
   - Type in search box
   - Verify filtered results

5. **Filter by Status**
   - Select different status options
   - Verify correct projects are shown

6. **Overdue Highlighting**
   - Create a project with past due date
   - Verify red border appears

## 📝 Database Schema

```sql
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  due_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Evaluation Notes for Reviewers

- **Clean Code**: All code follows TypeScript best practices with proper typing
- **Comments**: Comprehensive JSDoc-style comments throughout
- **Version Control**: Regular commits with descriptive messages
- **No AI Bulk Code**: Code written incrementally with clear commit history
- **Validation**: Both frontend and backend validation implemented
- **Error Handling**: Comprehensive error handling with user feedback
- **Responsive Design**: Works on all screen sizes

## 📧 Support

For any issues or questions, please contact:
- Email: suvijanadi@gmail.com
- GitHub Issues: [Create an issue](https://github.com/SuviniMayadunna/SuviniMayadunna-HasthiyaTracker/issues)

## 📄 License

This project was created as part of the Hasthiya IT Software Engineer Intern assignment.

---
