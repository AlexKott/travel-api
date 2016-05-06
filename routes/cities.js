'use strict';
const express = require('express');
const router = express.Router();
const City = require('../models/city');

const cityConfig = {
    getAll: 'type attributes relationships.country',
    getOne: '',
    popRel: 'id'
}

router.route('/cities')
    .get( (req, res) => {
        City.find({}, cityConfig.getAll)
            //.populate('relationships.country.data.id', cityConfig.popRel)
            .exec( (err, cities) => {
                if (err) {
                    return res.send({ errors: [ err ] });
                }
                res.send({ data: cities });
            });
    })
    .post( (req, res) => {
        // let id = req.body.data.relationships.country.data.id;
        // req.body.data.relationships.country.data._id = id ;
        // delete req.body.data.relationships.country.data.id

        console.log(req.body.data.relationships);

        const city = new City(req.body.data);

        city.save( (err) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            return res.send({ data: city });
        });
    });

router.route('/cities/:id')
    .get( (req, res) => {
        City.findOne({_id: req.params.id}, cityConfig.getOne)
            //.populate('relationships.country.data.id', cityConfig.popRel)
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
