import express from 'express';
import 'dotenv/config'
import { conntectDB } from './database/connection.js'
import cors from 'cors'

// routers
import userRouter from './routes/userRoute.js'

const server = express();
conntectDB()

// middlewares
server.use(express.json())
server.use(
    cors({
        origin: process.env.FRONTEND_URL,
        exposedHeaders: ['X-Total-Count'],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

// routes
server.use('/api/user', userRouter)

server.get('/', (req, res) => {
    res.send('Hello World!');
})

server.listen(process.env.PORT, () => {
    console.log("sarver started at 8080 port");
});