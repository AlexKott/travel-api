'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const languageSchema = new Schema({
    _id: String,
    name: String,
    translations: {
        hello: String,
        thank_you: String
    }
});

languageSchema.path('name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Language', languageSchema);
