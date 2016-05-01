'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const currencySchema = new Schema({
    id: String,
    name: String,
    exchangeRateEUR: Number,
    exchangeRateUSD: Number
});

currencySchema.path('name').set(function(n) {
    this.id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Currency', currencySchema);
