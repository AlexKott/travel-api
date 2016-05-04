'use strict';
const express = require('express');
const router = express.Router();
const City = require('../models/city');

const cityConfig = {
    getAll: '_id type attributes relationships.country',
    getOne: '',
    popRel: '_id type'
}

router.route('/cities')
    .get( (req, res) => {
        City.find({}, cityConfig.getAll)
            .populate('relationships.country.data', cityConfig.popRel)
            .populate('relationships.region.data', cityConfig.popRel)
            .populate('relationships.locations.data', cityConfig.popRel)
            .exec( (err, cities) => {
                if (err) {
                    return res.send({ errors: [ err ] });
                }
                res.send({ data: cities });
            });
    })
    .post( (req, res) => {
        const city = new City(req.body.data);

        city.save( (err) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            return res.send({ data: { message: 'City added.' } });
        });
    });

router.route('/cities/:id')
    .get( (req, res) => {
        City.findOne({_id: req.params.id}, cityConfig.getOne)
            .populate('relationships.country.data', cityConfig.popRel)
            .populate('relationships.region.data', cityConfig.popRel)
            .populate('relationships.locations.data', cityConfig.popRel)
            .exec( (err, city) => {
                if (err) {
                    return res.send({ errors: [ err ] });
                }
                res.send({ data: city });
            });
    })
    .put( (req, res) => {
        City.findOneAndUpdate({_id: req.params.id}, req.body.data, { new: true }, (err, city) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: city });
        });
    })
    .delete( (req, res) => {
        City.findOneAndRemove({_id: req.params.id}, (err, city) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            if (!city) {
                return res.send({ errors: [{ message: `Not found!` }]})
            }
            res.send({ data: { message: `City ${city._id} deleted!`} });
        });
    });

module.exports = router;
