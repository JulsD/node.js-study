import config from './config/app.config.json';
import { User, Product, DirWatcher, Importer } from './models';

console.log(config.name);

const User_1 = new User();
const Product_1 = new Product();

const myDirWatcher = new DirWatcher();
const myImporter = new Importer();

myDirWatcher.watch('./data/', 3000);
myImporter.listen(myDirWatcher, (err, result)=>{
    if(err) throw err;
    console.log('result: ', result);
});
