'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const currencySchema = new Schema({
    _id: String,
    type: {
        type: String,
        default: 'currencies'
    },
    attributes: {
        name: String,
        exchangeRateEUR: Number,
        exchangeRateUSD: Number
    }
}, {
    versionKey: false
});

currencySchema.path('name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Currency', currencySchema);
