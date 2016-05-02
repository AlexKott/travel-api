'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const citySchema = new Schema({
    _id: String,
    type: {
        type: String,
        default: 'cities'
    },
    attributes: {
        nameLocal: String,
        nameEnglish: String,
        description: String,
        publicTransport: String,
        position: [Number],
        safetyRating: {
            rating: Number,
            reason: String
        }
    },
    relationships: {
        country: {
            data: {
                type: String,
                ref: 'Country'
            }
        },
        region: {
            data: {
                type: String,
                ref: 'Region'
            }
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

citySchema.path('attributes.nameEnglish').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('City', citySchema);
