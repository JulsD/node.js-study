import config from './config/app.config.json';
import { User, Product } from './moduls';

console.log(config.name);

const User_1 = new User();
const Product_1 = new Product();