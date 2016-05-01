'use strict';

const express = require('express');
const router = express.Router();
const Country = require('../models/country');

const countryConfig = {
    getAll: '-_id type id',
    getOne: '-_id',
    popRel: '-_id type id'
};

router.route('/countries')
    .get( (req, res) => {
        Country.find({}, countryConfig.getAll)
            .populate('relationships.capital.data', countryConfig.popRel)
            .exec( (err, countries) => {
                if (err) {
                    return res.send(err);
                }
                res.json({ data: countries });
            });
    })
    .post( (req, res) => {
        const country = new Country(req.body.data);

        country.save( (err) => {
            if (err) {
                return res.send(err);
            }
            res.send({ message: 'Country added.' });
        });
    });

router.route('/countries/:id')
    .get( (req, res) => {
        Country.findOne({id: req.params.id}, countryConfig.getOne)
            .populate('relationships.capital.data', countryConfig.popRel)
            .exec( (err, country) => {
                if (err) {
                    return res.send(err);
                }
                res.json({ data: country });
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
