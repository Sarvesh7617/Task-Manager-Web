# 🧠 Task Management Backend API

A robust backend API built with **Node.js**, **Express**, **MongoDB**, and **Socket.io** for real-time collaborative task management. This backend supports user authentication, task CRUD operations, real-time updates, and secure JWT-based route protection.

## ✨ Features

- 🔐 User registration & login (JWT-based auth)
- ✅ Task creation, updating, deletion
- 👥 User management & task assignment
- 📡 Real-time updates with Socket.IO
- 🛡️ Protected routes using JWT middleware
- 📦 Clean and scalable code structure (MVC pattern)


## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **Socket.IO** – Real-time communication
- **JWT (JSON Web Tokens)** – Authentication
- **bcrypt.js** – Password hashing
- **dotenv** – Environment variables


## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/task-manager-backend.git
cd '.\Task manager\backend\'
```


2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**

Create a .env file in the root and add:
```bash
PORT=5000
CORS_ORIGIN=http://localhost:"your frontend port number"
MONGOOSE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net
JWT_SECRET=your_jwt_secret
```
```markdown
⚠️ **Note:** > 🔑 Replace `<username>` and `<password>` with your MongoDB Atlas credentials.
```

4. **Running the Server**

```bash
npm run dev
```
---

## 📁 Project Structure
```bash
backend/
├──src/
|  ├── controllers/
|  │   ├── auth.controllers.js
|  │   ├── task.controllers.js
|  │   └── user.controllers.js
|  |
|  ├── db/
|  │   └── index.js
|  |
|  ├── middleware/
|  │   └── auth.middleware.js
|  |
|  ├── model/
|  │   ├── task.model.js
|  │   └── user.model.js
|  |
|  ├── routes/
|  │   ├── auth.routes.js
|  │   ├── tasks.routes.js
|  │   └── users.routes.js
|  |
|  ├── utils/
|  │   ├── ApiError.js
|  │   └── asyncHandler.js
|  |
|  ├── app.js
|  ├── constant.js
|  └──index.js
├──.env
└──package.json
```

## 🔐 Authentication Routes

All authentication routes are prefixed with `/api/auth`.

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| POST   | `/register`    | Register a new user                  |
| POST   | `/login`       | Login and receive a JWT token        |
| GET    | `/protected`   | Access protected route (JWT required) |





## 📋 Task Routes

All task routes are **protected** and prefixed with `/api/tasks`.

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| POST   | `/`          | Create a new task         |
| GET    | `/`          | Get all tasks (with filters) |
| PUT    | `/:id`       | Update a task by ID       |
| DELETE | `/:id`       | Delete a task by ID       |



### 🔎 Supported Query Parameters (for GET `/api/tasks`)

- `status` → Filter by task status (`Todo`, `In Progress`, `Completed`)
- `priority` → Filter by priority (`Low`, `Medium`, `High`)
- `assignee` → Filter by assigned user ID
- `keyword` → Search by title or description (case-insensitive)


## 👥 User Routes

All user routes are **protected** and prefixed with `/api/users`.

| Method | Endpoint | Description                  |
|--------|----------|------------------------------|
| GET    | `/`      | Get all users (name + email) |



## 📡 Real-Time Events (Socket.IO)

Clients should connect to the server via **Socket.IO** to receive live updates.

### 🔸 Events Emitted from Server

| Event Name   | Payload              |
|--------------|----------------------|
| `taskCreated` | New task object      |
| `taskUpdated` | Updated task object  |
| `taskDeleted` | Deleted task ID      |


## 📡 Real-Time Events (Socket.IO)

Clients should connect to the server via **Socket.IO** to receive live updates.

### 🔸 Events Emitted from Server

| Event Name   | Payload              |
|--------------|----------------------|
| `taskCreated` | New task object      |
| `taskUpdated` | Updated task object  |
| `taskDeleted` | Deleted task ID      |
