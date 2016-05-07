'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    id: String,
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
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('Currency', currencySchema);
