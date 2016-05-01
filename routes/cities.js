'use strict';
const express = require('express');
const router = express.Router();
const City = require('../models/city');

const cityConfig = {
    getAll: '-_id type id attributes relationships',
    getOne: '-_id',
    popRel: '-_id type id'
}

router.route('/cities')
    .get( (req, res) => {
        City.find({}, cityConfig.getAll)
            .populate('relationships.country.data', cityConfig.popRel)
            .exec( (err, cities) => {
                if (err) {
                    return res.send(err);
                }
                res.json({
                    data: cities
                });
            });
    })
    .post( (req, res) => {
        const city = new City(req.body.data);

        city.save( (err) => {
            if (err) {
                return res.send(err);
            }
            return res.send({ message: 'City added.' });
        });
    });

router.route('/cities/:id')
    .get( (req, res) => {
        City.findOne({id: req.params.id}, cityConfig.getOne)
            .populate('relationships.country.data', cityConfig.popRel)
            .exec( (err, city) => {
                if (err) {
                    return res.send(err);
                }
                res.json({ data: city });
            });
    })
    .put( (req, res) => {
        City.findOneAndUpdate({id: req.params.id}, req.body, (err, city) => {
            if (err) {
                return res.send(err);
            }
            res.json({ data: city });
        });
    })
    .delete( (req, res) => {
        City.findOneAndRemove({id: req.params.id}, (err, city) => {
            if (err) {
                return res.send(err);
            }
            res.send({ message: `City ${city.id} deleted!`});
        });
    });

module.exports = router;
