import express from 'express';
import mongoose from 'mongoose';
const cityRouter = express.Router();
import { City } from '../models';
import { updateDate } from '../middlewares';

cityRouter.param('id', function(req, res, next, id) {
    req.cityId = id;
    next();
})

cityRouter.route('/api/cities')
.get((req, res) => {
    City
    .find(function (err, cities) {
        if (err) return console.error(err);
    })
    .select('-__v')
    .exec()
    .then(cities => {
        const response = {
            count: cities.length,
            cities: cities.map(city => {
                return {
                    name: city.name,
                    country: city.country,
                    capital: city.capital,
                    location: city.location,
                    _id: city._id,
                    lastModifiedDate: city.lastModifiedDate,
                    request: {
                        type: 'GET',
                        url: `/api/cities/${city._id}`
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
.post(updateDate, (req, res) => {
    const city = new City({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        country: req.body.country,
        capital: req.body.capital,
        location: req.body.location,
        lastModifiedDate: req.body.lastModifiedDate
    }); 
    city
    .save()
    .then(city => {
        const response = {
            massage: "Handling POST request to /cities",
            createdProduct: {
                name: city.name,
                country: city.country,
                capital: city.capital,
                location: city.location,
                _id: city._id,
                lastModifiedDate: city.lastModifiedDate,
                request: {
                    type: 'PUT',
                    url: `/api/cities/${city._id}`,
                    body: {
                        name: 'String',
                        country: 'String',
                        capital: 'Boolean',
                        location: {
                            lat: 'Number',
                            long: 'Number'
                        }
                    },
                    description: 'To update existing or to add new city'
                }
            }
        }

        res.status(201).json(response);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    });
});

cityRouter.route('/api/cities/:id')
.get((req, res) => {
    City
    .findById(req.cityId)
    .select('-__v')
    .exec()
    .then(city => {
        if(city) {
            const response = {
                name: city.name,
                country: city.country,
                capital: city.capital,
                location: {
                    lat: city.location.lat,
                    long: city.location.long
                },
                lastModifiedDate: city.lastModifiedDate,
                _id: city._id,
                request: {
                    type: 'DELETE',
                    url: `/api/cities/${city._id}`,
                    description: 'To delete city by ID'
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
.put(updateDate, (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.cityId)) {
        City
        .update(
            {_id: req.cityId},
            { 
                $set: {
                    name: req.body.name,
                    country: req.body.country,
                    capital: req.body.capital,
                    location: {
                        lat: req.body.location.lat,
                        long: req.body.location.long
                    },
                    lastModifiedDate: req.body.lastModifiedDate
                }
            }, 
            { upsert : true })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'City updated',
                request: {
                    type: 'GET',
                    url: `/api/cities/${req.cityId}`,
                    description: 'To get an updated city'
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        })
    } else {
        res.status(404).json({
            message: "ID provided is in invalid format"
        });
    }
    
})
.delete((req, res, next) => {
    City
    .remove({_id: req.cityId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "City deleted",
            request: {
                type: 'GET',
                url: '/api/cities',
                description: 'To get all cities'
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    })
});

export default cityRouter;