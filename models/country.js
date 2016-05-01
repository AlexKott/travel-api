'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createStringId = require('../utils/createStringId');

const countrySchema = new Schema({
    id: String,
    type: {
        type: String,
        default: 'countries'
    },
    attributes: {
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
            warnings: [String],
            vaccinations: [String],
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
        ]
    },
    relationships: {
        capital: {
            data: {
                type: Schema.Types.ObjectId,
                ref: 'City'
            }
        },
        cities: {
            data: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'City'
                }
            ]
        },
        regions: {
            data: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Region'
                }
            ]
        },
        languagesOfficial: {
            data: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Language'
                }
            ]
        },
        languagesMinority: {
            data: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Language'
                }
            ]
        },
        currency: {
            data: {
                type: Schema.Types.ObjectId,
                ref: 'Currency'
            }
        },
        locations: {
            data: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Location'
                }
            ]
        }
    }
}, {
    versionKey: false
});

countrySchema.path('attributes.nameEnglish').set(function(n) {
    this.id = createStringId(n);
    return n;
});

module.exports = mongoose.model('Country', countrySchema);
