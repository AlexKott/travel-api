'use strict';
const express = require('express');
const router = express.Router();
const City = require('../models/city');

const createStringId = require('../utils/createStringId');
const isValid = require('../utils/isValid');
const includeRelationships = require('../utils/includeRelationships');

const cityConfig = {
    getAll: '-_id id type attributes relationships.country',
    getOne: '-_id '
}

router.route('/cities')
    .get( (req, res) => {
        City.find({}, cityConfig.getAll, (err, cities) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: cities });
        });
    })

    .post( (req, res) => {
        const city = new City(req.body.data);

        city.id = createStringId.city(city.attributes.nameEnglish,
                                    city.relationships.country.data.id);

        isValid.city(city.id)
            .then( () => {
                city.save( (err, c) => {
                    if (err) {
                        return res.status(500).send({ errors: [{ detail: err }]});
                    }
                    res.status(201).send({ data: c });
                });
            }).catch( () => {
                res.status(409)
                    .send({ errors: [{
                        detail: 'City already exists!',
                        source: { pointer: 'cities' }
                    }]});
            });
    });

router.route('/cities/:id')
    .get( (req, res) => {
        City.findOne({id: req.params.id}, cityConfig.getOne).lean()
                        .exec( (err, city) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!city) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            const includeCountry = includeRelationships.country(
                { 'id': city.relationships.country.data.id });
            Promise.all([includeCountry]).then( (values) => {
                let docs = [].concat.apply([], values);
                
                res.send({ data: city, included: docs });
            });
        });
    })

    .patch( (req, res) => {
        City.findOneAndUpdate({ id: req.params.id }, req.body.data, { new: true },
                            (err, city) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!city) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.send({ data: city });
        });
    })

    .delete( (req, res) => {
        City.findOneAndRemove({id: req.params.id}, (err, city) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!city) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]})
            }
            res.status(204).send();
        });
    });

module.exports = router;
