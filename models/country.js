'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const countrySchema = new Schema({
    _id: String,
    nameLocal: String,
    nameEnglish: String,
    description: String,
    flag: String,
    money: String,
    politics: String,
    importExport: String,
    culture: String,
    publicTransport: String,
    trafficRules: {
        speedLimits: String,
        driversLicense: String,
        other: String
    },
    safetyRating: {
        rating: Number,
        reason: String
    },
    visaRegulations: [
        {
            country: String,
            description: String
        }
    ],
    health: {
        quality: Number,
        warnings: [
            String
        ],
        vaccinations: [
            String
        ],
        tappedWater: Number
    },
    emergencyNumbers: [
        {
            name: String,
            number: Number
        }
    ],
    embassyAdresses: [
        {
            country: String,
            address: String
        }
    ],
    religions: [
        {
            name: String,
            percentage: Number
        }
    ],
    events: [
        {
            name: String,
            date: Date
        }
    ],
    links: [
        {
            type: String,
            name: String,
            url: String
        }
    ],
    capital: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    }
});

countrySchema.path('nameEnglish').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Country', countrySchema);
