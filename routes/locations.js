'use strict';
const express = require('express');
const router = express.Router();
const Location = require('../models/location');

const locationConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/locations')
    .get( (req, res) => {
        Location.find({}, locationConfig.getAll, (err, locations) => {
            if (err) {
                return res.send(err);
            }
            res.json(locations);
        })
    })
    .post( (req, res) => {
        const location = new Location(req.body);

        location.save( (err) => {
            if (err) {
                return res.send(err);
            }
            return res.send({ message: 'Location added.' });
        });
    });

router.route('/locations/:id')
    .get( (req, res) => {
        Location.findOne({id: req.params.id}, locationConfig.getOne, (err, location) => {
            if (err) {
                return res.send(err);
            }
            res.json(location);
        });
    })

module.exports = router;
