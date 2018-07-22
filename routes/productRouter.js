import express from 'express';

const productRouter = express.Router();
import models from '../models';
import { tokenCheck } from '../middlewares';

productRouter.param('id', function(req, res, next, id) {
    req.productId = id;
    next();
});

productRouter.route('/api/products', )
    .get(tokenCheck, (req, res) => {
        models.product.findAll().then(products => {
            res.json(products);
        })
    })
    .post(tokenCheck, (req, res) => {
        models.product
        .findOrCreate({where: req.body, defaults: {reviews: ['Technical prod']}})
        .spread((product, created) => {
            res.json(product.get({
                plain: true
            }))
        });
    });

productRouter.route('/api/products/:id')
        .get(tokenCheck, (req, res) => {
            models.product.findById(req.productId).then(productItem => {
                res.json(productItem);
            })
        });
        
productRouter.route('/api/products/:id/reviews')
        .get(tokenCheck, (req, res) => {
            models.product.findById(req.productId).then(productItem => {
                res.json(productItem.reviews);
            })
        });
        
export default productRouter;