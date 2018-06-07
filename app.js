// import config from './config/app.config.json';
// import { User, Product } from './models';
// console.log(config.name);
// const User_1 = new User();
// const Product_1 = new Product();

const express = require('express');
const app = express();
const cookieParser = require('./middlewares/cookieParser');
app.use(cookieParser());
app.get('/', (req, res) => res.send('Hello World!'))

module.exports = app;