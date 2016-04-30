'use strict';

const express = require('express');
const router = express.Router();
const Country = require('../models/country');

router.route('/countries')
    .get( (req, res) => {
        Country.find( (err, countries) => {
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
    })

module.exports = router;
