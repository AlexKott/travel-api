'use strict';
const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');

const createStringId = require('../utils/createStringId');
const isValid = require('../utils/isValid');

const currencyConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/currencies')
    .get( (req, res) => {
        Currency.find({}, currencyConfig.getAll, (err, currencies) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: currencies });
        })
    })

    .post( (req, res) => {
        const currency = new Currency(req.body.data);

        currency.id = createStringId.base(currency.attributes.name);

        isValid.currency(currency.id)
            .then( () => {
                currency.save( (err, c) => {
                    if (err) {
                        return res.status(500).send({ errors: [{ detail: err }]});
                    }
                    res.status(201).send({ data: c });
                });
            }).catch( () => {
                res.status(409)
                    .send({ errors: [{
                        detail: 'Currency already exists!',
                        source: { pointer: 'currencies' }
                    }]});
            });
    });

router.route('/currencies/:id')
    .get( (req, res) => {
        Currency.findOne({id: req.params.id}, currencyConfig.getOne,
                        (err, currency) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: currency });
        });
    })

    .patch( (req, res) => {
        Currency.findOneAndUpdate({id: req.params.id}, req.body.data, { new: true },
                                (err, currency) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!currency) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.send({ data: currency });
        });
    })

    .delete( (req, res) => {
        Currency.findOneAndRemove({id: req.params.id}, (err, currency) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!currency) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.status(204).send();
        });
    });

module.exports = router;
