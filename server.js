import 'express-async-errors'
import express from 'express';
const app = express();
import dotenv from 'dotenv';
/* import cors from 'cors'; */

dotenv.config();

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

/* app.use(cors()) */
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome'
    });
})

app.get('/api/v1', (req, res) => {
    res.json({
        message: 'API'
    });
})

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();