import config from './config/app.config.json';
import { User, Product } from './models';
import { defaultRouter } from './routes';

console.log(config.name);

const User_1 = new User();
const Product_1 = new Product();

import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

app.use('/', defaultRouter);

export default app;