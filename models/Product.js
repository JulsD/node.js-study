import mongoose from 'mongoose';
import products from '../data/products';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    color: {
        type: String,
        reqired: true
    },
    reviews: [String]
  });

const Product = mongoose.model('Product', productSchema);

products.forEach(productData => {
    Product.findOne(productData, function (err, product) {
        if (err) throw err;
        if (!product) {
            let newProduct = new Product(productData);
            newProduct.save( (err, newProduct) => {
                if (err) return console.error(err);
                console.log(newProduct, ' created');
            });
        }
    })
});

export default Product;