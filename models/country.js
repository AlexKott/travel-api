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
        rating: int,
        reason: String
    },
    visaRegulations: [
        {
            country: String,
            description: String
        }
    ],
    health: {
        quality: int,
        warnings: [
            String
        ],
        vaccinations: [
            String
        ],
        tappedWater: int
    },
    emergencyNumbers: [
        {
            name: String,
            number: int
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
            percentage: double
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
    ]
});

countrySchema.path('name').set(function(n) {
    this._id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Country', countrySchema);
