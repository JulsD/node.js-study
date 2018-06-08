const products = express.Router();

products.route('/api/products')
        .get((req, res) => {
            res.send('All Products');
        })
        .post(function (req, res) {
            res.send('New product');
        });

export default products;