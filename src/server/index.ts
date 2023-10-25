import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import userRouter from '@routes/userRoutes';
import authRouter from '@routes/authRoutes';
import clientRouter from '@routes/clientRoutes';
import transactionRouter from '@routes/transactionRoutes';
import serviceRouter from '@routes/serviceRoutes';
import t_itemRouter from '@routes/t_itemRoutes';

const server = express();

server.use(cors());

server.use(express.json());
server.use(userRouter);
server.use(authRouter);
server.use(clientRouter);
server.use(transactionRouter);
server.use(serviceRouter);
server.use(t_itemRouter);

export default server;
