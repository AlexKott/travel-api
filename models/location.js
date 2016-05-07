'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    id: String,
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
        },
        city: {
            data: {
                id: {
                    type: String,
                    ref: 'City'
                },
                type: {
                    type: String,
                    default: 'cities'
                }
            }
        },
        region: {
            data: {
                id: {
                    type: String,
                    ref: 'Region'
                },
                type: {
                    type: String,
                    default: 'regions'
                }
            }
        }
    }
}, {
    versionKey: false,
    toJSON: {
        transform (doc, ret) {
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('Location', locationSchema);
