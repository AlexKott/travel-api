'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
}, {
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('Region', regionSchema);
