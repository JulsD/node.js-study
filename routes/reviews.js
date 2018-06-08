const reviews = express.Router();

reviews.route('/api/products/:id/reviews')
       .param('id', function(req, res, next, id) {
           req.reviewsId = id;
       })
       .get((req, res) => {
            res.send(`Reviews for product with id ${req.reviewsId}`);
        });

export default reviews;