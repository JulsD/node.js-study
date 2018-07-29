import mongoose from 'mongoose';

import User from './User';
import Product from './Product';
import City from './City';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('we are connected!') });

export {
    User,
    Product,
    City
}