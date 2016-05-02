'use strict';
const express = require('express');
const router = express.Router();
const Region = require('../models/region');

const regionConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/regions')
    .get( (req, res) => {
        Region.find({}, regionConfig.getAll, (err, regions) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: regions });
        })
    })
    .post( (req, res) => {
        const region = new Region(req.body);

        region.save( (err) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            return res.send({ data: { message: 'Region added.' } });
        });
    });

router.route('/regions/:id')
    .get( (req, res) => {
        Region.findOne({_id: req.params.id}, regionConfig.getOne, (err, region) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: region });
        });
    })

module.exports = router;
