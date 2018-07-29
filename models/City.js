import mongoose from 'mongoose';
import cities from '../data/cities';

const citySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        reqired: true
    },
    country: {
        type: String,
        reqired: true
    },
    capital: {
        type: Boolean,
        reqired: true
    },
    location: {
        lat: {
            type: Number,
            reqired: true
        },
        long: {
            type: Number,
            reqired: true
        }
    },
    lastModifiedDate: Date
  });

const City = mongoose.model('City', citySchema);

cities.forEach(cityData => {
    City.findOne(cityData, function (err, city) {
        if (err) throw err;
        if (!city) {
            let newCity = new City({
                _id: new mongoose.Types.ObjectId(),
                name: cityData.name,
                country: cityData.country,
                capital: cityData.capital,
                location: {
                    lat: cityData.location.lat,
                    long: cityData.location.long
                },
                lastModifiedDate: Date.now()
            });
            newCity.save( (err, newCity) => {
                if (err) return console.error(err);
                console.log(newCity, ' created');
            });
        }
    })
});

export default City;