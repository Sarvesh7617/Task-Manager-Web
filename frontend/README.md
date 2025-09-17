# Task Manager Frontend

This is the frontend of the **Task Manager App**, built with **React.js** and **Tailwind CSS**. It allows users to register, login, create, assign, and manage tasks in real-time using **Socket.IO**.


### 🏠 Home Page
<img width="1902" height="968" alt="Screenshot 2025-09-17 021324" src="https://github.com/user-attachments/assets/a1d0d904-21ef-4263-bbaa-396f65d8eb7b" />


### 📊 Dashboard
<img width="1917" height="960" alt="Screenshot 2025-09-17 021424" src="https://github.com/user-attachments/assets/db8094b8-f4d0-49c9-8a59-a6bdb1f90d5f" />


### ✅ Task UI
<img width="1916" height="965" alt="Screenshot 2025-09-17 021440" src="https://github.com/user-attachments/assets/bc64a30b-a726-44dd-aa60-fd4b672e9c57" />

---
## 🚀 Features

- 🔐 User authentication (Register & Login)
- 👤 JWT-based protected routes
- 📋 Create, update, delete tasks
- 🧑 Assign tasks to users
- 🟢 Real-time updates with Socket.IO
- 🔍 Filter tasks by status, priority, assignee, and keywords
- ⚙️ Responsive UI using Tailwind CSS
- 🔔 Toast notifications (via react-toastify)

---
## 🛠️ Tech Stack

### Frontend
- **React** — JavaScript library for building user interfaces
- **React Router DOM** — For client-side routing
- **Axios** — For HTTP requests to backend APIs
- **React Toastify** — For notifications and toast messages
- **Socket.io-client** — For real-time updates (task updates)
- **Tailwind CSS** — Utility-first CSS framework for styling
###


---
## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd '.\Task manager\backend'
```


### 2. Install Dependencies

```bash
npm install
```


### 3. Environment Variables

Create a .env file in the root directory:
```bash
VITE_BACKEND_URL=http://localhost:5000
```


### 4. Start the Development Server

```bash
npm run dev
```
### The app will run on http://localhost:5173 (or whichever port Vite uses).

---
## 📁 Frontend Folder Structure
frontend/
├── public/                  # Public static files (index.html, favicon, etc.)
├── src/
│   ├── config/
│   │   └── config.js        # Environment variables and API base URL
│   ├── pages/               # React components for different routes/pages
│   │   ├── Dashboard.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Tasks.jsx
│   ├── App.jsx              # Main app component with routing setup
|   ├── index.css            # Global styles           
│   └── main.jsx            
├── vite.config.js           # Vite build configuration
├──.env                      # enviroment variable
└── package.json             # Project metadata and dependencies


## 6. 🧩 Components Breakdown

### 6.1 `LandingPage.jsx`

- Welcome screen with Login and Register buttons.
- Navigates to /login or /register.

### 6.2 Register.jsx

- Form to create a new user.
- Fields: Name, Email, Password.
- Sends POST request to backend /api/auth/register.
- On success, shows toast and redirects to landing page.

### 6.3 Login.jsx

- Form to login user.
- Fields: Email, Password.
- Sends POST request to backend /api/auth/login.
- On success, stores JWT token in localStorage.
- Redirects to /dashboard.

 ### 6.4 Dashboard.jsx

- Protected route, fetches protected resource from /api/auth/protected.
- Displays welcome message and user info (name, email).
- Buttons:

 - **Go to Tasks**: navigates to `/tasks`.
 - **Logout**: clears token and navigates to `/login`.

### 6.5 Tasks.jsx

- Displays list of tasks fetched from /api/tasks.
- Real-time updates using Socket.io
- Form to add new task with fields: title, description, priority, assignee.
- Filters for status, priority, assignee, and search keyword
- Buttons on each task to update status or delete task.
- Uses toast notifications for success/error feedback.

### 7. Routing (App.jsx)

```bash
<Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tasks" element={<Tasks />} />
  </Routes>
</Router>
```



### 8. Dependencies

- react
- react-router-dom
- axios
- socket.io-client
- react-toastify
- tailwindcss (and related setup)
