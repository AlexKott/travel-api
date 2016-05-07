'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    id: String,
    type: {
        type: String,
        default: 'languages'
    },
    attributes: {
        name: String,
        translations: {
            hello: String,
            thank_you: String
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

module.exports = mongoose.model('Language', languageSchema);
