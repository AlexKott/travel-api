'use strict';
const _ = require('lodash');
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
        const countryName = _.get(city, 'relationships.country.data.id');

        /* TODO: Refactor validation to external service */
        if (!countryName) {
            return res.status(422).send({ errors: [{ detail: 'No country provided!' }]});
        }
        city.id = createStringId.city(city.attributes.nameEnglish, countryName);

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

            let includes = [];
            const countryId = _.get(city, 'relationships.country.data.id');
            const regionId = _.get(city, 'relationships.region.data.id');

            if (countryId) {
                includes.push(includeRelationships.countries({ 'id': countryId }));
            }
            if (regionId) {
                includes.push(includeRelationships.regions({ 'id': regionId }));
            }

            Promise.all(includes).then( (values) => {
                let docs = [].concat.apply([], values);

                res.send({ data: city, included: docs });
            });
        });
    })

    .patch( (req, res) => { // TODO: update ID if name has changed, rerun validation
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
