'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
                id: {
                    type: String,
                    ref: 'Country'
                },
                type: {
                    type: String,
                    default: 'countries'
                }
            }
        }
    }
}, {
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('City', citySchema);
