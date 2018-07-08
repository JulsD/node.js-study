import express from 'express';

const productRouter = express.Router();
import { Product } from '../models';
import { validateProductSchema } from '../middlewares';

let myProducts = new Product([
    {
        id: 1,
        name: '1productName',
        color: 'red',
        reviews: ['good', 'perfect', 'smart']
    },
    {
        id: 2,
        name: '2productName',
        color: 'blue',
        reviews: ['hard to understand', 'small']
    }
]);

productRouter.param('id', function(req, res, next, id) {
    req.productId = id;
    next();
})

productRouter.route('/api/products')
        .get((req, res) => {
            res.json(myProducts.fetchAll());
        })
        .post(validateProductSchema, function (req, res) {
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