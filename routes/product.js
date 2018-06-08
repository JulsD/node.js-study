const product = express.Router();

product.route('/api/products/:id')
       .param('id', function(req, res, next, id) {
           req.productId = id;
       })
       .get((req, res) => {
            res.send(`Product with id ${req.productId}`);
        });

export default product;