import config from './config/app.config.json';
import { User, Product, DirWatcher, Importer } from './models';

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

const myDirWatcher = new DirWatcher();

myDirWatcher.watch('./data/', 3000);
