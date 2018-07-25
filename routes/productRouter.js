import express from 'express';
const productRouter = express.Router();
import { Product } from '../models';

productRouter.param('id', function(req, res, next, id) {
    req.productId = id;
    next();
})

productRouter.route('/api/products')
        .get((req, res) => {
            Product.find(function (err, results) {
                if (err) return console.error(err);
                res.json(results);
            })
        })
        .post(function (req, res) {
            res.json(myProducts.add(req.body));
        });

productRouter.route('/api/products/:id')

        .get((req, res) => {
            res.json(myProducts.get(req.productId));
        });
        
productRouter.route('/api/products/:id/reviews')
        .get((req, res) => {
            res.json(myProducts.get(req.productId).reviews);
        });
        
export default productRouter;