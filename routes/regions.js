'use strict';
const express = require('express');
const router = express.Router();
const Region = require('../models/region');

const regionConfig = {
    getAll: 'type attributes',
    getOne: ''
}

router.route('/regions')
    .get( (req, res) => {
        Region.find({}, regionConfig.getAll, (err, regions) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: regions });
        })
    })
    .post( (req, res) => {
        const region = new Region(req.body.data);

        region.save( (err) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            return res.send({ data: { message: 'Region added.' } });
        });
    });

router.route('/regions/:id')
    .get( (req, res) => {
        Region.findOne({_id: req.params.id}, regionConfig.getOne, (err, region) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: region });
        });
    })
    .patch( (req, res) => {
        Region.findOneAndUpdate({_id: req.params.id}, req.body.data, { new: true }, (err, region) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: region });
        });
    })
    .delete( (req, res) => {
        Region.findOneAndRemove({_id: req.params.id}, (err, region) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            if (!region) {
                return res.send({ errors: [{ message: `Not found!` }]})
            }
            res.send({ data: { message: `Region ${region._id} deleted!`} });
        });
    });

module.exports = router;
