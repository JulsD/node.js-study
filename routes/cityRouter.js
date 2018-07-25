import express from 'express';
const cityRouter = express.Router();
import { City } from '../models';

cityRouter.route('/api/cities')
    .get((req, res) => {
        City.find(function (err, cities) {
            if (err) return console.error(err);
            res.send(cities[Math.floor(Math.random()*cities.length)]);
        })
        
    })
    .post((req, res) => {
        res.send({type: "POST"});
    })
    .put((req, res) => {
        res.send({type: "PUT"});
    })
    .delete((req, res) => {
        res.send({type: "DELETE"});
    });

export default cityRouter;