import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors({ 
    origin: process.env.CORS_ORIGIN, 
    credentials: true 
}));

app.use(express.json());


// routes import

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import userRoutes from './routes/users.routes.js';



app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);


export {app};
