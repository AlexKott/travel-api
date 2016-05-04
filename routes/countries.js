'use strict';

const express = require('express');
const router = express.Router();
const Country = require('../models/country');

const countryConfig = {
    getAll: 'type attributes',
    getOne: '',
    popRel: 'type'
};

router.route('/countries')
    .get( (req, res) => {
        Country.find({}, countryConfig.getAll)
            .populate('relationships.capital.data', countryConfig.popRel)
            .populate('relationships.cities.data', countryConfig.popRel)
            .populate('relationships.locations.data', countryConfig.popRel)
            .populate('relationships.regions.data', countryConfig.popRel)
            .populate('relationships.currency.data', countryConfig.popRel)
            .populate('relationships.languagesOfficial.data', countryConfig.popRel)
            .populate('relationships.languagesMinority.data', countryConfig.popRel)
            .exec( (err, countries) => {
                if (err) {
                    return res.send({ errors: [ err ] });
                }
                res.send({ data: countries });
            });
    })
    .post( (req, res) => {
        const country = new Country(req.body.data);

        country.save( (err) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: { message: 'Country added.' } });
        });
    });

router.route('/countries/:id')
    .get( (req, res) => {
        Country.findOne({_id: req.params.id}, countryConfig.getOne)
            .populate('relationships.capital.data', countryConfig.popRel)
            .populate('relationships.cities.data', countryConfig.popRel)
            .populate('relationships.locations.data', countryConfig.popRel)
            .populate('relationships.regions.data', countryConfig.popRel)
            .populate('relationships.currency.data', countryConfig.popRel)
            .populate('relationships.languagesOfficial.data', countryConfig.popRel)
            .populate('relationships.languagesMinority.data', countryConfig.popRel)
            .exec( (err, country) => {
                if (err) {
                    return res.send({ errors: [ err ] });
                }
                res.send({ data: country });
            });
    })
    .put( (req, res) => {
        Country.findOneAndUpdate({_id: req.params.id}, req.body.data, { new: true }, (err, country) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: country });
        });
    })
    .delete( (req, res) => {
        Country.findOneAndRemove({_id: req.params.id}, (err, country) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            if (!country) {
                return res.send({ errors: [{ message: `Not found!` }]})
            }
            res.send({ data: { message: `Country ${country._id} deleted!`} });
        });
    })

module.exports = router;
