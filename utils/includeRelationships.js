'use strict';

const City = require('../models/city');

const includeConfig = {
    cities: '_id type attributes.nameEnglish'
};

module.exports = {
    cities(data) {
        return new Promise( (resolve, reject) => {
            includes = [];
            data.forEach( (city) => {
                City.findOne({ _id: city.id },
                            includeConfig.cities,
                            (err, city) => {
                    if (!err) {
                        includes.push(city);
                    }
                });
            });
        });
    }
};
