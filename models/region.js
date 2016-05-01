'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const regionSchema = new Schema({
    id: String,
    name: String,
    description: String,
    notable: [
        {
            name: String,
            description: String
        }
    ],
    countries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Country'
        }
    ],
    cities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'City'
        }
    ],
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        }
    ]
}, {
    versionKey: false
});

regionSchema.path('name').set(function(n) {
    this.id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Region', regionSchema);
