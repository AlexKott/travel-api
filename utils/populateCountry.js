'use strict';
const _ = require('lodash');
const includeRelationships = require('../utils/includeRelationships');

module.exports = function (country) {
    let includes = [];
    const capitalId = _.get(country, 'relationships.capital.data.id');
    const currencyId = _.get(country, 'relationships.currency.data.id');
    const langOffArr = _.get(country, 'relationships.languagesOfficial.data')
    const langMinArr = _.get(country, 'relationships.languagesMinority.data');
    const regionsArr = _.get(country, 'relationships.regions.data');

    if (capitalId) {
        includes.push(includeRelationships.cities({ 'id': capitalId }));
    } else {
        delete country.relationships.capital;
    }
    if (currencyId) {
        includes.push(includeRelationships.currencies({ 'id': currencyId }));
    } else {
        delete country.relationships.currency;
    }
    if (langOffArr && langOffArr.length > 0) {
        langOffArr.forEach( (l) => {
            includes.push(includeRelationships.languages({ 'id': l.id }));
        });
    } else {
        delete country.relationships.languagesOfficial;
    }
    if (langMinArr && langMinArr.length > 0) {
        langMinArr.forEach( (l) => {
            includes.push(includeRelationships.languages({ 'id': l.id }));
        });
    } else {
        delete country.relationships.languagesMinority;
    }
    if (regionsArr && regionsArr.length > 0) {
        regionsArr.forEach( (r) => {
            includes.push(includeRelationships.regions({ 'id': r.id }));
        });
    } else {
        delete country.relationships.regions;
    }

    includes.push(includeRelationships.cities(
        { 'relationships.country.data.id': country.id }));
    includes.push(includeRelationships.locations(
        { 'relationships.country.data.id': country.id }));

    return includes;
}
