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
                return res.send(err);
            }
            res.json({data: currencies });
        })
    })
    .post( (req, res) => {
        const currency = new Currency(req.body);

        currency.save( (err) => {
            if (err) {
                return res.send(err);
            }
            return res.send({ message: 'Currency added.' });
        });
    });

router.route('/currencies/:id')
    .get( (req, res) => {
        Currency.findOne({id: req.params.id}, currencyConfig.getOne, (err, currency) => {
            if (err) {
                return res.send(err);
            }
            res.json({data: currency });
        });
    })

module.exports = router;
