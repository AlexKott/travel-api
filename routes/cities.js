'use strict';
const express = require('express');
const router = express.Router();
const City = require('../models/city');
const createStringId = require('../utils/createStringId');
const isValid = require('../utils/isValid');

const cityConfig = {
    getAll: '-_id id type attributes relationships.country',
    getOne: '-_id '
}

router.route('/cities')
    .get( (req, res) => {
        City.find({}, cityConfig.getAll)
            .exec( (err, cities) => {
                if (err) {
                    return res.send({ errors: [{ status: 500, detail: err }]});
                }
                res.send({ data: cities });
            });
    })
    .post( (req, res) => {
        const city = new City(req.body.data);

        city.id = createStringId.city(city.attributes.nameEnglish, city.relationships.country.data.id);

        isValid.city(city.id)
            .then(() => {
                city.save( (err, c) => {
                    if (err) {
                        return res.send({ errors: [{ status: 500, detail: err }]});
                    }
                    return res.send({ data: c });
                });
            }, () => {
                res.send({ errors: [{ status: 400, detail: 'City already exists!' }]});
            });
    });

router.route('/cities/:id')
    .get( (req, res) => {
        City.findOne({id: req.params.id}, cityConfig.getOne)
            .exec( (err, city) => {
                if (err) {
                    return res.send({ errors: [{ status: 500, detail: err }]});
                }
                res.send({ data: city });
            });
    })
    .patch( (req, res) => {
        City.findOneAndUpdate({id: req.params.id},
                            req.body.data,
                            { new: true },
                            (err, city) => {

            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }

            res.send({ data: city });
        });
    })
    .delete( (req, res) => {
        City.findOneAndRemove({id: req.params.id},
                            (err, city) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            if (!city) {
                return res.send({ errors: [{ status: 404, detail: `${req.params.id} not found!` }]})
            }
            res.send();
        });
    });

module.exports = router;
