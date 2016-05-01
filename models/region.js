'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const regionSchema = new Schema({
    id: String,
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
                    type: Schema.Types.ObjectId,
                    ref: 'Country'
                }
            ]
        },
        cities: {
            data: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'City'
                }
            ]
        },
        locations: {
            data: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Location'
                }
            ]
        }
    }
}, {
    versionKey: false
});

regionSchema.path('name').set(function(n) {
    this.id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Region', regionSchema);
