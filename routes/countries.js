'use strict';

const express = require('express');
const router = express.Router();
const Country = require('../models/country');

const countryConfig = {
    getAll: '-_id id nameEnglish nameOriginal description flag safetyRating capital',
    getOne: ''
};

router.route('/countries')
    .get( (req, res) => {
        Country.find({}, countryConfig.getAll, (err, countries) => {
            if (err) {
                return res.send(err);
            }
            res.json(countries);
        });
    })
    .post( (req, res) => {
        const country = new Country(req.body);

        country.save( (err) => {
            if (err) {
                return res.send(err);
            }
            res.send({ message: 'Country added.' });
        });
    });

router.route('/countries/:id')
    .get( (req, res) => {
        Country.findOne({id: req.params.id}, countryConfig.getOne, (err, country) => {
            if (err) {
                return res.send(err);
            }
            res.json(country);
        });
    })
    .delete( (req, res) => {
        Country.findOneAndRemove({id: req.params.id}, (err, country) => {
            if (err) {
                return res.send(err);
            }
            res.send({ message: `Country ${country.id} deleted!`});
        });
    })

module.exports = router;
