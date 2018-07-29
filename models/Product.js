import mongoose from 'mongoose';
import products from '../data/products';

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
            const newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: productData.name,
                color: productData.color,
                reviews: productData.reviews
            }); 
            newProduct.save( (err, newProduct) => {
                if (err) return console.error(err);
                console.log(newProduct, ' created');
            });
        }
    })
});

export default Product;