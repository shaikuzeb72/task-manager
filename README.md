# Task Manager Application

A modern, responsive full-stack Task Manager application built with React, Tailwind CSS, Node.js, Express.js, JWT Authentication, and SQLite. The application allows users to register, log in securely, and manage tasks using a Kanban-style board with drag-and-drop functionality.

---

## Live Demo

### Frontend Application

https://task-manager-psi-eosin-62.vercel.app

### Backend API

https://task-manager-api-i7wc.onrender.com

### GitHub Repository

https://github.com/shaikuzeb72/task-manager

---

## Features

### Authentication

* User Registration
* User Login
* User Logout
* JWT-based Authentication
* Password Hashing using bcrypt
* Protected Routes

### Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Drag-and-Drop Task Movement
* Task Status Management

### Kanban Board

Tasks are organized into three stages:

* Todo
* In Progress
* Done

### User Experience

* Responsive Design
* Mobile Friendly
* Tablet Friendly
* Desktop Friendly
* Modern User Interface
* Toast Notifications
* Loading States
* Error Handling

### Security

* JWT Authentication
* Password Encryption
* User-specific Task Access
* Protected Backend Routes

---

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Lucide React Icons
* @hello-pangea/dnd

### Backend

* Node.js
* Express.js

### Database

* SQLite

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

task-manager/

├── frontend/

│   ├── src/

│   ├── public/

│   └── package.json

│

├── backend/

│   ├── controllers/

│   ├── middleware/

│   ├── routes/

│   ├── db.js

│   ├── server.js

│   └── package.json

│

└── README.md

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/shaikuzeb72/task-manager.git

cd task-manager
```

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
```

Start the backend server:

```bash
npm run dev
```

The SQLite database file will be created automatically on first run.

---

### Frontend Setup

Open a new terminal:

```bash
cd frontend

npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

Backend runs at:

```text
http://localhost:5000
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

### Tasks

#### Get All Tasks

```http
GET /api/tasks
```

#### Create Task

```http
POST /api/tasks
```

#### Update Task

```http
PUT /api/tasks/:id
```

#### Delete Task

```http
DELETE /api/tasks/:id
```

---

## Deployment Instructions

### Backend Deployment (Render)

1. Push code to GitHub.
2. Create a new Web Service on Render.
3. Set Root Directory to:

```text
backend
```

4. Build Command:

```text
npm install
```

5. Start Command:

```text
npm start
```

6. Add Environment Variable:

```text
JWT_SECRET=your_secret_key_here
```

7. Deploy.

---

### Frontend Deployment (Vercel)

1. Import the GitHub repository into Vercel.
2. Set Root Directory to:

```text
frontend
```

3. Build Command:

```text
npm run build
```

4. Output Directory:

```text
dist
```

5. Deploy.

---

## Notes

* SQLite is used for data storage.
* Database tables are automatically created on first run.
* Render free tier may put the backend to sleep after inactivity; the first request may take a few seconds to respond.
* This project was developed as part of a Task Manager internship assignment.

---

## Future Improvements

* User Profile Management
* Task Priorities
* Task Due Dates
* Task Search and Filtering
* Dark Mode
* Email Notifications
* PostgreSQL Migration for Production Use

---

## License

MIT License

---

## Author

Shaik Uzeb

Task Manager Internship Assignment Project
