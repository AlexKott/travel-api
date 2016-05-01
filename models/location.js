'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const locationSchema = new Schema({
    _id: String,
    name: String,
    type: String,
    description: String,
    position: [Number]
});

locationSchema.path('name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Location', locationSchema);
