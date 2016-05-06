'use strict';
const express = require('express');
const router = express.Router();
const Location = require('../models/location');

const locationConfig = {
    getAll: '',
    getOne: ''
}

router.route('/locations')
    .get( (req, res) => {
        Location.find({}, locationConfig.getAll, (err, locations) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: locations });
        })
    })
    .post( (req, res) => {
        const location = new Location(req.body.data);

        location.save( (err) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            return res.send({ data: { message: 'Location added.' } });
        });
    });

router.route('/locations/:id')
    .get( (req, res) => {
        Location.findOne({_id: req.params.id}, locationConfig.getOne, (err, location) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: location });
        });
    })
    .patch( (req, res) => {
        Location.findOneAndUpdate({_id: req.params.id}, req.body.data, { new: true }, (err, location) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: location });
        });
    })
    .delete( (req, res) => {
        Location.findOneAndRemove({_id: req.params.id}, (err, location) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            if (!location) {
                return res.send({ errors: [{ message: `Not found!` }]})
            }
            res.send({ data: { message: `Location ${location._id} deleted!`} });
        });
    });

module.exports = router;
