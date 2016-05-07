'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
                type: {
                    type: String
                },
                name: String,
                url: String
            }
        ]
    },
    relationships: {
        capital: {
            data: {
                id: {
                    type: String,
                    ref: 'City'
                },
                type: {
                    type: String,
                    default: 'cities'
                }
            }
        },
        languagesOfficial: {
            data: [
                {
                    id: {
                        type: String,
                        ref: 'Language'
                    },
                    type: {
                        type: String,
                        default: 'languages'
                    }
                }
            ]
        },
        languagesMinority: {
            data: [
                {
                    id: {
                        type: String,
                        ref: 'Language'
                    },
                    type: {
                        type: String,
                        default: 'languages'
                    }
                }
            ]
        },
        currency: {
            data: {
                id: {
                    type: String,
                    ref: 'Currency'
                },
                type: {
                    type: String,
                    default: 'currencies'
                }
            }
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

module.exports = mongoose.model('Country', countrySchema);
