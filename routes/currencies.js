'use strict';
const express = require('express');
const router = express.Router();
const Currency = require('../models/currency');

const currencyConfig = {
    getAll: '',
    getOne: ''
}

router.route('/currencies')
    .get( (req, res) => {
        Currency.find({}, currencyConfig.getAll, (err, currencies) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: currencies });
        })
    })
    .post( (req, res) => {
        const currency = new Currency(req.body.data);

        currency.save( (err) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            return res.send({ data: { message: 'Currency added.' } });
        });
    });

router.route('/currencies/:id')
    .get( (req, res) => {
        Currency.findOne({_id: req.params.id}, currencyConfig.getOne, (err, currency) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: currency });
        });
    })
    .patch( (req, res) => {
        Currency.findOneAndUpdate({_id: req.params.id}, req.body.data, { new: true }, (err, currency) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: currency });
        });
    })
    .delete( (req, res) => {
        Currency.findOneAndRemove({_id: req.params.id}, (err, currency) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            if (!currency) {
                return res.send({ errors: [{ message: `Not found!` }]})
            }
            res.send({ data: { message: `Currency ${currency._id} deleted!`} });
        });
    });

module.exports = router;
