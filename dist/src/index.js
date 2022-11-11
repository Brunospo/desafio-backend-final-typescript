"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const categoryRouter_1 = __importDefault(require("./router/categoryRouter"));
const clientRouter_1 = __importDefault(require("./router/clientRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const authenticationRouter_1 = __importDefault(require("./router/authenticationRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const orderRouter_1 = __importDefault(require("./router/orderRouter"));
const uploadImageRouter_1 = __importDefault(require("./router/uploadImageRouter"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, cors_1.default)());
app.use('/categoria', categoryRouter_1.default);
app.use('/cliente', clientRouter_1.default);
app.use('/usuario', userRouter_1.default);
app.use('/login', authenticationRouter_1.default);
app.use('/produto', productRouter_1.default);
app.use('/pedido', orderRouter_1.default);
app.use('/upload', uploadImageRouter_1.default);
//Catch all
app.use(errorMiddleware_1.errorMiddleware);
app.listen(process.env.PORT, () => { console.log('Servidor rodando'); });
; //eslint-disable-line
