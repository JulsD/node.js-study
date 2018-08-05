import express from 'express';
const productRouter = express.Router();
import productControllers from '../controllers/productControllers';
import { updateDate } from '../middlewares';

productRouter.param('id', function(req, res, next, id) {
    req.productId = id;
    next();
})

productRouter.route('/products')
    .get(productControllers.getAllProducts)
    .post(updateDate, productControllers.addProduct);

productRouter.route('/products/:id')
    .get(productControllers.getProductById)
    .delete(productControllers.deleteProduct)
    .patch(productControllers.updateOrCreateProduct);
        
productRouter.route('/products/:id/reviews').get(productControllers.getProductReviews);

export default productRouter;