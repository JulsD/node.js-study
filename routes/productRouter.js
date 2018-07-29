import express from 'express';
import mongoose from 'mongoose';
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
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    color: doc.color,
                    reviews: doc.reviews,
                    _id: doc._id,
                    request: [
                        {
                            type: 'GET',
                            url: `/api/products/${doc._id}`,
                            description: 'To get one product by ID'
                        }, 
                        {
                            type: 'DELETE',
                            url: `/api/products/${doc._id}`,
                            description: 'To delete one product by ID'
                        }
                    ]
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
        _id: new mongoose.Types.ObjectId(),
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
                _id: doc._id,
                request: {
                    type: 'PATCH',
                    url: `/api/products/${doc._id}`,
                    body: [
                        {
                            propName: 'property name',
                            value: 'property new value'
                        }
                    ],
                    description: 'To update the product'
                }
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
    .exec()
    .then(doc => {
        if(doc) {
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
                    url: `/api/products/${doc._id}/reviews`,
                    description: 'To get reviews of the product'
                }
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({massage: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
})
.delete((req, res, next) => {
    Product
    .remove({_id: req.productId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Product deleted",
            request: {
                type: 'POST',
                url: 'api/products',
                body: {
                    name: 'String',
                    color: 'String'
                },
                description: 'To create a new product'
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
})
.patch((req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product
    .update({_id: req.productId}, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: `/api/products/${req.productId}`,
                description: 'To get an updated product'
            }
        });
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
    .exec()
    .then(doc => { res.status(200).json(doc.reviews) })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
});

export default productRouter;