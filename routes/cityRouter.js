import express from 'express';
const cityRouter = express.Router();
import cityControllers from '../controllers/cityControllers';
import { updateDate } from '../middlewares';

cityRouter.param('id', function(req, res, next, id) {
    req.cityId = id;
    next();
})

cityRouter.route('/cities')
    .get(cityControllers.getAllCities)
    .post(updateDate, cityControllers.addCity);

cityRouter.route('/cities/:id')
    .get(cityControllers.getCityById)
    .put(updateDate, cityControllers.updateOrCreateCity)
    .delete(cityControllers.deleteCity);

export default cityRouter;