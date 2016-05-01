'use strict';

const config = require('../config');
const mongoose = require('mongoose');

beforeEach(function(done) {

    function clearDB() {
        for (let i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove();
        }
        return done();
    }


    if (mongoose.connection.readyState === 0) {
        mongoose.connect(config.db.test, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    } else {
        return clearDB();
    }
});


afterEach(function(done) {
    mongoose.disconnect();
    return done();
});
