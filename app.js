import config from './config/app.config.json';
import { User, Product, Dirwatcher, Importer } from './models';

console.log(config.name);

const User_1 = new User();
const Product_1 = new Product();

const myImporter = new Importer();

myImporter.import('./data/test.csv')
.then((data) => {
    console.log('Async data log: ', data);
})
.catch((error) => {
    console.log(error);
});

console.log('Sync data log: ', myImporter.importSync('./data/test.csv'));