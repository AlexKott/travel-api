'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const regionSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    notable: [
        {
            name: String,
            description: String
        }
    ]
});

regionSchema.path('name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Region', regionSchema);
