'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const languageSchema = new Schema({
    _id: String,
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

languageSchema.path('attributes.name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

if (!languageSchema.options.toJSON) {
  languageSchema.options.toJSON = {};
}
languageSchema.options.toJSON.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
};

module.exports = mongoose.model('Language', languageSchema);
