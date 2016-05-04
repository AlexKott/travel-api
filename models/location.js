'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const locationSchema = new Schema({
    _id: String,
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
    }
}, {
    versionKey: false
});

locationSchema.path('attributes.name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

if (!locationSchema.options.toJSON) {
  locationSchema.options.toJSON = {};
}
locationSchema.options.toJSON.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
};

module.exports = mongoose.model('Location', locationSchema);
