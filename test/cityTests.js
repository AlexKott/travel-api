'use strict';

const assert = require('chai').assert;
const mongoose = require('mongoose');
const City = require('../models/city');
const utils = require('./utils');


describe('City', function() {
    it('should create a new city', function (done) {
        const city = {
            nameLocal: 'Wien',
            nameEnglish: 'Vienna',
            description: 'A city in Austria',
            publicTransport: 'working',
            position: [48.210077, 16.382113],
            safetyRating: {
                rating: 1,
                reason: 'its safe'
            }
        };
        City.create(city, function(err, createdCity) {
            assert.isNull(err);
            assert.equal(createdCity.id, 'vienna');
            assert.equal(createdCity.publicTransport, 'working');
            assert.equal(createdCity.position[0], 48.210077);
            done();
        });
    });
});
