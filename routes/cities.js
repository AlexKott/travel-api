'use strict';
const express = require('express');
const router = express.Router();
const City = require('../models/city');
const Country = require('../models/country');

const cityConfig = {
    getAll: '-_id id nameEnglish nameLocal description position safetyRating',
    getOne: '-_id',
    popCountry: '-_id id nameEnglish nameLocal description flag safetyRating capital',
    popRegion: '-_id id name description',
    popLocations: '-_id id name type description'
}

router.route('/cities')
    .get( (req, res) => {
        City.find({}, cityConfig.getAll, (err, cities) => {
            if (err) {
                return res.send(err);
            }
            res.json(cities);
        })
    })
    .post( (req, res) => {
        const city = new City(req.body);

        city.save( (err) => {
            if (err) {
                return res.send(err);
            }
            return res.send({ message: 'City added.' });
        });
    });

router.route('/cities/:id')
    .get( (req, res) => {
        City.findOne({id: req.params.id}, cityConfig.getOne, (err, city) => {
            if (err) {
                return res.send(err);
            }
            city
            .populate('country', cityConfig.popCountry)
            .populate('region', cityConfig.popRegion)
            .populate('locations', cityConfig.popLocations)
            .exec( (err, popCity) => {
                if (err) {
                    return res.send(err);
                }
                res.json(popCity);
            });
        });
    })

module.exports = router;
