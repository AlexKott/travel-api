'use strict';

const City = require('../models/city');
const Country = require('../models/country');

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
    country(criteria) {
        return this.base(Country, criteria, includeConfig.all);
    }
};
