'use strict';

const assert = require('chai').assert;
const mongoose = require('mongoose');
const City = require('../models/city');
const Country = require('../models/country');
const utils = require('./utils');


describe('Country', function() {
    it('should create a new country', function (done) {
        const country = {
            nameLocal: 'Österreich',
            nameEnglish: 'Austria',
            description: 'A small country',
            publicTransport: 'working',
            safetyRating: {
                rating: 1,
                reason: 'its safe'
            }
        };
        Country.create(country, function(err, createdCountry) {
            assert.isNull(err);
            assert.equal(createdCountry.id, 'austria');
            assert.equal(createdCountry.publicTransport, 'working');
            assert.equal(createdCountry.safetyRating.rating, 1);
            done();
        });
    });
    it('should save a capital for a country', function (done) {
        let country = {
            nameEnglish: 'Austria',
            description: 'A small country'
        }
        const city = {
            nameEnglish: 'Vienna',
            description: 'A city in Austria'
        };

        City.create(city, function(e, createdCity) {
            country.capital = createdCity._id;
            Country.create(country, function (err, createdCountry) {
                assert.isNull(err);
                assert.equal(createdCountry.id, 'austria');
                assert.isNotNull(createdCountry.capital);
                done();
            });
        });
    });
    it('should populate a capital for a country', function (done) {
        let country = {
            nameEnglish: 'Austria',
            description: 'A small country'
        }
        const city = {
            nameEnglish: 'Vienna',
            description: 'A city in Austria'
        };

        City.create(city, function(e, createdCity) {
            country.capital = createdCity._id;
            Country.create(country, function (e2, cCountry) {
                cCountry.populate('capital', function (err, createdCountry) {
                    assert.isNull(err);
                    assert.equal(createdCountry.capital.id, 'vienna');
                    done();
                });
            });
        });
    });
});
