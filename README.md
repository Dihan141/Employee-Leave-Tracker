# Employee Leave Tracker

## Overview
Employee Leave Tracker is a full-stack web application that allows organizations to manage employee leave requests efficiently.

Employees can apply for leave and track their leave balance, while administrators can manage employees, review leave requests, and approve or reject them.

The system ensures that:
- Employees can request leave periods easily
- Leave balances are automatically validated
- Administrators can monitor employee leave status through dashboards

---

# Tech Stack

## Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- MySQL as Database
- JWT Authentication

## Frontend
- React
- Vite

## Containerization
- Docker
- Docker Compose

---

# Features

## Authentication
- JWT-based login system
- Role-based access control (Admin / Employee)

## Employee Management
- Create employees
- Update employee information
- Delete employees
- Retrieve employee information

## Leave Management
- Apply for leave
- Prevent overlapping and invalid leave requests
- Approve or reject leave requests
- Track leave balance

## Dashboards
- Admin dashboard
- Employee leave overview
- Employees currently on leave

---
# Architecture

The application follows a layered architecture that separates concerns and improves maintainability.

```
Frontend (React)
       ↓
REST API (ASP.NET Core)
       ↓
Service Layer
       ↓
Repository Layer
       ↓
Database (MySQL)
```

## Layers Explained

### Controllers
- Handle HTTP requests
- Validate input
- Call service layer methods

### Services
- Implement business logic
- Manage leave validation
- Handle employee operations

### Repositories
- Perform database operations
- Abstract data access from services

### DTOs
- Control what data is exposed to the client
- Prevent sensitive data exposure (e.g., passwords)

---
# Project Structure

```
employee-leave-tracker
│
├── backend
│   ├── Controllers
|   ├── Interfaces
│   ├── Services
│   ├── Repositories
│   ├── Models
│   ├── DTOs
│   ├── Data
|   ├── DockerFile
│   └── Program.cs
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── api
│   ├── hooks
|   ├── context
|   ├── DockerFile
|
└── docker-compose.yml
```
---

# Inner Workings

## Authentication Flow
1. User logs in with email and password
2. Backend validates credentials
3. A JWT token is generated
4. Frontend stores the token
5. All protected API requests include the token in the Authorization header

```
Authorization: Bearer <token>
```

---

## Leave Application Flow
1. Employee submits a leave request
2. Backend verifies:
   - Employee exists
   - Leave balance is sufficient
   - Leave dates are valid
   - No overlapping leave exists
3. Leave request is stored with **Pending** status

---

## Leave Approval
1. Admin reviews pending leave requests
2. Admin approves or rejects the request
3. If approved:
   - Employee remaining leave balance is updated

---

## Preventing Overlapping Leaves

When a leave request is created, the system checks whether the requested leave dates overlap with existing leaves.

```
newStartDate <= existingEndDate
AND
newEndDate >= existingStartDate
```

If this condition is true, the leave request isn't created.

---

# Setup & Run Instructions

# Running With Docker

Run the entire system using:

```
docker compose up --build
```

Services will run on:

```
Frontend → http://localhost:5173
Backend  → http://localhost:5223
MySQL    → localhost:3306
```

Docker automatically:
- Starts MySQL
- Runs EF migrations
- Starts the backend API
- Starts the React frontend

# Running Without Docker

## Backend

```
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

Backend runs on:

```
http://localhost:5223
```

---

## Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Creating Admin Account 

An admin account must be created using the **create-admin API endpoint**. The api can be accessed from swagger in the following link:
```
http://localhost:5223/swagger/index.html
```

Example request:

```
POST /api/auth/create-admin
```

Example body:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123"
}
```

After creating the admin account, you can log in using the normal login endpoint and create other employee accounts

---
