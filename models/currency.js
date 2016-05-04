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

currencySchema.path('attributes.name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

if (!currencySchema.options.toJSON) {
  currencySchema.options.toJSON = {};
}
currencySchema.options.toJSON.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
};

module.exports = mongoose.model('Currency', currencySchema);
