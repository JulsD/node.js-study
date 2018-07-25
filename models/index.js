import User from './User';
import Product from './Product';

import { MongoClient } from 'mongodb';

const connectDB = (cb) => {
    MongoClient.connect('mongodb://localhost:27017/mydb', function (err, client) {
        if (err) cb(err)
        cb(null, client.db('mydb'))
    });
}


export {
    User,
    Product,
    connectDB
}