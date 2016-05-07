'use strict';
const express = require('express');
const router = express.Router();
const Region = require('../models/region');

const createStringId = require('../utils/createStringId');
const isValid = require('../utils/isValid');

const regionConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/regions')
    .get( (req, res) => {
        Region.find({}, regionConfig.getAll, (err, regions) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: regions });
        })
    })

    .post( (req, res) => {
        const region = new Region(req.body.data);

        region.id = createStringId.base(region.name);

        isValid.region(region.id)
            .then( () => {
                region.save( (err, l) => {
                    if (err) {
                        return res.status(500).send({ errors: [{ detail: err }]});
                    }
                    res.status(201).send({ data: l });
                });
            }).catch( () => {
                res.status(409)
                    .send({ errors: [{
                        detail: 'Region already exists!',
                        source: { pointer: 'regions' }
                    }]});
            });
    });

router.route('/regions/:id')
    .get( (req, res) => {
        Region.findOne({id: req.params.id}, regionConfig.getOne, (err, region) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!region) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.send({ data: region });
        });
    })

    .patch( (req, res) => {
        Region.findOneAndUpdate({id: req.params.id}, req.body.data, { new: true },
                                (err, region) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!region) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.send({ data: region });
        });
    })

    .delete( (req, res) => {
        Region.findOneAndRemove({id: req.params.id}, (err, region) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!region) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.status(204).send();
        });
    });

module.exports = router;
