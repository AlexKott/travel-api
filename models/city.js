'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const citySchema = new Schema({
    id: String,
    nameLocal: String,
    nameEnglish: String,
    description: String,
    publicTransport: String,
    position: [Number],
    safetyRating: {
        rating: Number,
        reason: String
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Region'
    },
    locations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        }
    ]
}, {
    versionKey: false
});

citySchema.path('nameEnglish').set(function(n) {
    this.id = createStringId(n);
    return n;
});

module.exports = mongoose.model('City', citySchema);
