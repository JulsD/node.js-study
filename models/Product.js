import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    color: String,
    reviews: [String]
  });

const Product = mongoose.model('Product', productSchema);

export default Product;