const City = require('../models/city');

module.exports = {
    city (id) {
        return new Promise((resolve, reject) => {
            City.findOne({ id }, (err, doc) => {
                if (doc) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
}
