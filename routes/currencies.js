'use strict';
const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');

const currencyConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/currencies')
    .get( (req, res) => {
        Currency.find({}, currencyConfig.getAll, (err, currencies) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: currencies });
        })
    })
    .post( (req, res) => {
        const currency = new Currency(req.body);

        currency.save( (err) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            return res.send({ data: { message: 'Currency added.' } });
        });
    });

router.route('/currencies/:id')
    .get( (req, res) => {
        Currency.findOne({_id: req.params.id}, currencyConfig.getOne, (err, currency) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: currency });
        });
    })

module.exports = router;
