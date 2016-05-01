'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

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
    versionKey: false
});

languageSchema.path('name').set(function(n) {
    this.id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Language', languageSchema);
