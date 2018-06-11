import config from './config/app.config.json';
console.log(config.name);

import express from 'express';
import { productRouter, userRouter } from './routes';

const app = express();
app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use(productRouter);
app.use(userRouter);

export default app;
