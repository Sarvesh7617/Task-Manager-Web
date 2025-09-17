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
CORS_ORIGIN=http://localhost:your frontend port number
MONGOOSE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net
JWT_SECRET=your_jwt_secret
```
```markdown
> ⚠️ **Note:** > 🔑 Replace `<username>` and `<password>` with your MongoDB Atlas credentials.
