import express from 'express';
import 'dotenv/config'
import { conntectDB } from './database/connection.js'
import cors from 'cors'

// routers
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import shopRouter from './routes/shopRoute.js'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import { v2 as cloudinary } from 'cloudinary';


const server = express();
conntectDB()

// middlewares
server.use(express.json({limit:'50mb'}))
server.use(express.urlencoded({extended:true , limit:"50mb"}))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(bodyParser.json({limit:'50mb'}))
server.use(fileUpload({
    limits:{
        fileSize:50 * 1024 * 1024 
    }
}))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_DB,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


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
server.use('/api/shop', shopRouter)
server.use('/api/product', productRouter)

server.get('/', (req, res) => {
    res.send('Hello World!');
})

server.listen(process.env.PORT, () => {
    console.log("sarver started at 8080 port");
});