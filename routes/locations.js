'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Location = require('../models/location');

const createStringId = require('../utils/createStringId');
const isValid = require('../utils/isValid');
const includeRelationships = require('../utils/includeRelationships');

const locationConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/locations')
    .get( (req, res) => {
        Location.find({}, locationConfig.getAll, (err, locations) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: locations });
        })
    })

    .post( (req, res) => {
        const location = new Location(req.body.data);

        location.id = createStringId.base(location.name);

        isValid.location(location.id)
            .then( () => {
                location.save( (err, l) => {
                    if (err) {
                        return res.status(500).send({ errors: [{ detail: err }]});
                    }
                    res.status(201).send({ data: l });
                });
            }).catch( () => {
                res.status(409)
                    .send({ errors: [{
                        detail: 'Location already exists!',
                        source: { pointer: 'locations' }
                    }]});
            });
    });

router.route('/locations/:id')
    .get( (req, res) => {
        Location.findOne({id: req.params.id}, locationConfig.getOne,
                        (err, location) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!location) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }

            let includes = [];
            const cityId = _.get(location, 'relationships.city.data.id');
            const countryId = _.get(location, 'relationships.country.data.id');
            const regionId = _.get(location, 'relationships.region.data.id');

            if (cityId) {
                includes.push(includeRelationships.cities({ 'id': cityId }));
            }
            if (countryId) {
                includes.push(includeRelationships.countries({ 'id': countryId }));
            }
            if (regionId) {
                includs.push(includeRelationships.regions({ 'id': regionId }));
            }

            Promise.all(includes).then( (values) => {
                let docs = [].concat.apply([], values);
                res.send({ data: location, included: docs });
            });
        });
    })

    .patch( (req, res) => {
        Location.findOneAndUpdate({id: req.params.id}, req.body.data, { new: true },
                                (err, location) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!location) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.send({ data: location });
        });
    })

    .delete( (req, res) => {
        Location.findOneAndRemove({id: req.params.id}, (err, location) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!location) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.status(204).send();
        });
    });

module.exports = router;
