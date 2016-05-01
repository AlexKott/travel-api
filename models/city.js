'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const citySchema = new Schema({
    id: String,
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
                type: Schema.Types.ObjectId,
                ref: 'Country'
            }
        },
        region: {
            data: {
                type: Schema.Types.ObjectId,
                ref: 'Region'
            }
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

citySchema.path('attributes.nameEnglish').set(function(n) {
    this.id = createStringId(n);
    return n;
});

module.exports = mongoose.model('City', citySchema);
