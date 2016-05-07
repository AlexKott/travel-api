const City = require('../models/city');
const Country = require('../models/country');
const Currency = require('../models/currency');
const Language = require('../models/language');
const Location = require('../models/location');
const Region = require('../models/region');

module.exports = {
    base (Model, id) {
        return new Promise( (resolve, reject) => {
            Model.findOne({ id }, (err, doc) => {
                if (doc) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    },
    city (id) {
        return this.base(City, id);
    },
    country (id) {
        return this.base(Country, id);
    },
    currency (id) {
        return this.base(Currency, id);
    },
    language (id) {
        return this.base(Language, id);
    },
    location (id) {
        return this.base(Location, id);
    },
    region (id) {
        return this.base(Region, id);
    }
}
