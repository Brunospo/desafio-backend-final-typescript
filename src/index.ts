import "dotenv/config";
import "express-async-errors";

import express from "express";
import cors from "cors"

import categoryRouter from "./router/categoryRouter";
import clientRouter from "./router/clientRouter"
import userRouter from "./router/userRouter"
import authenticationRouter from "./router/authenticationRouter"
import productRouter from './router/productRouter';
import orderRouter from './router/orderRouter';
import uploadImageRouter from './router/uploadImageRouter';

import { errorMiddleware } from "./middlewares/errorMiddleware"

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/categoria', categoryRouter);
app.use('/cliente', clientRouter);
app.use('/usuario', userRouter);
app.use('/login', authenticationRouter);
app.use('/produto', productRouter);
app.use('/pedido', orderRouter);
app.use('/upload', uploadImageRouter);

//Catch all
app.use(errorMiddleware);

app.listen(process.env.PORT, () => { console.log('Servidor rodando') });; //eslint-disable-line