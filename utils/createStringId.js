'use strict';

module.exports = {
    base (s) {
        return s.toLowerCase().replace(/ /g, '_');
    },
    city (cityName, countryName) {
        return `${this.base(cityName)}-${this.base(countryName)}`;
    }
}
