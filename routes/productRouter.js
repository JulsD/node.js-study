import express from 'express';

const productRouter = express.Router();
import { Product } from '../models';
import { validateProductSchema, tokenCheck } from '../middlewares';
import productsMock from '../data/products.json'

let myProducts = new Product(productsMock);

productRouter.param('id', function(req, res, next, id) {
    req.productId = id;
    next();
})

productRouter.route('/api/products', )
        .get(tokenCheck, (req, res) => {
            res.json(myProducts.fetchAll());
        })
        .post(validateProductSchema, function (req, res) {
            res.json(myProducts.add(req.body));
        });

productRouter.route('/api/products/:id')
        .get(tokenCheck, (req, res) => {
            res.json(myProducts.get(req.productId));
        });
        
productRouter.route('/api/products/:id/reviews')
        .get(tokenCheck, (req, res) => {
            res.json(myProducts.get(req.productId).reviews);
        });
        
export default productRouter;