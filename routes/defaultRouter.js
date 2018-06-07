const defaultRouter = express.Router();

defaultRouter.get('/', (req, res) => {
    res.json({});
})

export default defaultRouter;