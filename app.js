// import config from './config/app.config.json';
// import { User, Product } from './models';
// console.log(config.name);
// const User_1 = new User();
// const Product_1 = new Product();

import express from('express');
import { product, products, reviews, users } from 'routes';

const app = express();
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/products/:id/reviews', reviews);
app.use('/api/products/:id', product);
app.use('/api/products', products);
app.use('/api/users', users);

export default app;
