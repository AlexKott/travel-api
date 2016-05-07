'use strict';

const express = require('express');
const router = express.Router();
const Country = require('../models/country');

const createStringId = require('../utils/createStringId');
const isValid = require('../utils/isValid');

const countryConfig = {
    getAll: '-_id id type attributes',
    getOne: '-_id'
};

router.route('/countries')
    .get( (req, res) => {
        Country.find({}, countryConfig.getAll, (err, countries) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: countries });
        });
    })

    .post( (req, res) => {
        const country = new Country(req.body.data);

        country.id = createStringId.base(country.attributes.nameEnglish);

        isValid.country(country.id)
            .then( () => {
                country.save( (err) => {
                    if (err) {
                        return res.status(500).send({ errors: [{ detail: err }]});
                    }
                    res.status(201).send({ data: country });
                });
            }).catch( () => {
                res.status(409)
                    .send({ errors: [{ detail: 'Country already exists!' }]});
            });
    });

router.route('/countries/:id')
    .get( (req, res) => {
        Country.findOne({ id: req.params.id }, countryConfig.getOne, (err, country) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!country) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.send({ data: country });
        });
    })

    .patch( (req, res) => {
        Country.findOneAndUpdate({ id: req.params.id }, req.body.data, { new: true },
                                (err, country) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!country) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]})
            }
            res.send({ data: country });
        });
    })

    .delete( (req, res) => {
        Country.findOneAndRemove({ id: req.params.id }, (err, country) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!country) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]})
            }
            res.status(204).send();
        });
    });

module.exports = router;
