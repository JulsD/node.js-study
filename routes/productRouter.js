import express from 'express';
const productRouter = express.Router();
import { Product } from '../models';

productRouter.param('id', function(req, res, next, id) {
    req.productId = id;
    next();
})

productRouter.route('/api/products')
    .get((req, res) => {
        Product
        .find(function (err, results) {
            if (err) return console.error(err);
        })
        .select('-__v')
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        color: doc.color,
                        reviews: doc.reviews,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: `/api/products/${doc._id}`
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        })
    })
    .post((req, res) => {
        const product = new Product({
            name: req.body.name,
            color: req.body.color
        }); 
        product
        .save()
        .then(doc => {
            const response = {
                massage: "Handling POST request to /products",
                createdProduct: {
                    name: doc.name,
                    color: doc.color,
                    _id: doc._id
                }
            }

            res.status(201).json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        })
    });

productRouter.route('/api/products/:id')
    .get((req, res) => {
        Product
        .findById(req.productId)
        .select('-__v')
        .then(doc => {
            const response = {
                name: doc.name,
                color: doc.color,
                reviews: {
                    count: doc.reviews.length,
                    items: doc.reviews
                },
                _id: doc._id,
                request: {
                    type: 'GET',
                    url: `/api/products/${doc._id}/reviews`
                }
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        })
    });
        
productRouter.route('/api/products/:id/reviews')
    .get((req, res) => {
        Product
        .findOne({_id: req.productId}, (err, results) => {
            if (err) return console.error(err);
        })
        .select('reviews')
        .then(doc => { res.status(200).json(doc.reviews) })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        })
    });
        
export default productRouter;