# Task Manager Application

A modern, responsive, full-stack Task Manager application built with React, Tailwind CSS, Node.js, Express, and SQLite.

## Features

- **Authentication:** JWT-based user registration and login with bcrypt password hashing.
- **Task Management:** Create, read, update, and delete (CRUD) tasks.
- **Kanban Board:** Organize tasks into 'Todo', 'In Progress', and 'Done' columns.
- **Drag & Drop:** Intuitively move tasks between columns using drag-and-drop.
- **Responsive UI:** Clean, professional interface optimized for mobile, tablet, and desktop devices.
- **Security:** Protected routes ensuring users can only access their own tasks.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Lucide React (Icons), React Hot Toast, `@hello-pangea/dnd`
- **Backend:** Node.js, Express.js
- **Database:** SQLite (local `.db` file)
- **Authentication:** JSON Web Tokens (JWT), bcrypt

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

1. **Clone or Download the Repository:**
   Navigate to the project root directory (`task-manager`).

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

## Environment Variables

In the `backend` directory, create a `.env` file (one is already provided) with the following content:

```env
PORT=5000
JWT_SECRET=supersecretjwtkey_for_task_manager_app
```

*Note: In a production environment, ensure `JWT_SECRET` is a strong, unique string.*

## Run Commands

To run the application locally, you need two terminal windows.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```
*Note: The SQLite database file (`database.sqlite`) will be created automatically in the backend directory on first run.*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Client will run on http://localhost:5173
```

## Deployment Instructions

### Backend (Render, Railway, or Heroku)
1. Ensure your `package.json` has a `start` script: `"start": "node server.js"`.
2. Push your code to a GitHub repository.
3. Connect the repository to your hosting provider.
4. Set the build command to `npm install` and the start command to `npm start`.
5. Add the `JWT_SECRET` to the environment variables on the hosting platform.
6. *Note on SQLite:* SQLite stores data in a local file. On ephemeral filesystems (like Render free tier or Heroku), this data will be lost on restart. For production, consider migrating to PostgreSQL, or use a host with persistent disks (like Railway with a volume).

### Frontend (Vercel, Netlify, or Render)
1. In the `frontend` directory, ensure the API URL in `src/context/AuthContext.jsx` and `src/pages/Dashboard.jsx` (if hardcoded) is updated to point to your deployed backend URL. You can use environment variables (e.g., `import.meta.env.VITE_API_URL`) to handle this cleanly.
2. Push your code to GitHub.
3. Connect the repository to Vercel/Netlify.
4. Set the Root Directory to `frontend`.
5. The build command will automatically be detected as `npm run build` and output directory as `dist`.
6. Deploy the application.

## License
MIT License
