'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const regionSchema = new Schema({
    _id: String,
    type: {
        type: String,
        default: 'countries'
    },
    attributes: {
        name: String,
        description: String,
        notable: [
            {
                name: String,
                description: String
            }
        ]
    },
    relationships: {
        countries: {
            data: [
                {
                    type: String,
                    ref: 'Country'
                }
            ]
        },
        cities: {
            data: [
                {
                    type: String,
                    ref: 'City'
                }
            ]
        },
        locations: {
            data: [
                {
                    type: String,
                    ref: 'Location'
                }
            ]
        }
    }
}, {
    versionKey: false
});

regionSchema.path('attributes.name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Region', regionSchema);
