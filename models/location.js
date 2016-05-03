'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const locationSchema = new Schema({
    _id: String,
    type: {
        type: String,
        default: 'locations'
    },
    attributes: {
        name: String,
        type: {
            type: String
        },
        description: String,
        position: [Number]
    }
}, {
    versionKey: false
});

locationSchema.path('attributes.name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Location', locationSchema);
