import "dotenv/config";
import "express-async-errors";

import express from "express";
import cors from "cors"

import categoryRouter from "./router/categoryRouter";

/* const userRouter = require('./router/userRouter');
const authenticationRouter = require('./router/authenticationRouter');
const productRouter = require('./router/productRouter');
const clientRouter = require('./router/clientRouter');
const orderRouter = require('./router/orderRouter');
const uploadImageRouter = require('./router/uploadImageRouter'); */

import { errorMiddleware } from "./middlewares/errorMiddleware"

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.use('/categoria', categoryRouter);
/* app.use('/usuario', userRouter);
app.use('/login', authenticationRouter);
app.use('/produto', productRouter);
app.use('/cliente', clientRouter);
app.use('/pedido', orderRouter);
app.use('/upload', uploadImageRouter); */

//Catch all
app.use(errorMiddleware);

app.listen(process.env.PORT, () => { console.log('Servidor rodando') });; //eslint-disable-line