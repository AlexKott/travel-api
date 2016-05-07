'use strict';

const City = require('../models/city');
const Country = require('../models/country');
const Currency = require('../models/currency');
const Language = require('../models/language');
const Location = require('../models/location');
const Region = require('../models/region');

const includeConfig = {
    all: '-_id id type attributes relationships'
};

module.exports = {
    base (Model, criteria, projection) {
        return new Promise( ( resolve, reject) => {
            Model.find(criteria, projection, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    },
    cities(criteria) {
        return this.base(City, criteria, includeConfig.all);
    },
    countries(criteria) {
        return this.base(Country, criteria, includeConfig.all);
    },
    currencies(criteria) {
        return this.base(Currency, criteria, includeConfig.all);
    },
    languages(criteria) {
        return this.base(Language, criteria, includeConfig.all);
    },
    locations(criteria) {
        return this.base(Location, criteria, includeConfig.all);
    },
    regions(criteria) {
        return this.base(Region, criteria, includeConfig.all);
    }
};
