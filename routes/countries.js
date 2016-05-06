'use strict';

const express = require('express');
const router = express.Router();
const includeRelationships = require('../utils/includeRelationships');
const Country = require('../models/country');

const countryConfig = {
    getAll: 'type attributes',
    getOne: ''
};

router.route('/countries')
    .get( (req, res) => {
        Country.find({},
                    countryConfig.getAll,
                    (err, countries) => {
                if (err) {
                    return res.send({ errors: [{ status: 500, detail: err }]});
                }
                res.send({ data: countries });
            });
    })
    .post( (req, res) => {
        const country = new Country(req.body.data);

        country.save( (err) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: country });
        });
    });

router.route('/countries/:id')
    .get( (req, res) => {
        Country.findOne({ _id: req.params.id },
                        countryConfig.getOne,
                        (err, country) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            if (country.relationships.cities.data.length > 0) {
                Promise
                    .all([
                        includeRelationships.cities(country.relationships.cities.data),
                    ])
                    .then( (includes) => {
                        country.includes = includes;
                        res.send({ data: country });
                    });
            }
            else {
                res.send({ data: country });
            }
        });
    })
    .patch( (req, res) => {
        Country.findOneAndUpdate({ _id: req.params.id },
                                req.body.data,
                                { new: true },
                                (err, country) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: country });
        });
    })
    .delete( (req, res) => {
        Country.findOneAndRemove({ _id: req.params.id },
                                (err, country) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            if (!country) {
                return res.send({ errors: [{ status: 404, detail: `${req.params.id} not found!` }]})
            }
            res.send({ data: country });
        });
    });

module.exports = router;
