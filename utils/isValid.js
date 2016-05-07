const City = require('../models/city');
const Country = require('../models/country');

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
    }
}
