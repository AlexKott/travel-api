'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const app = express();

require('./models/city');
require('./models/country');
require('./models/currency');
require('./models/language');
require('./models/location');
require('./models/region');

const countries = require('./routes/countries');
const cities = require('./routes/cities');
const currencies = require('./routes/currencies');
const languages = require('./routes/languages');
const locations = require('./routes/locations');
const regions = require('./routes/regions');
const auth = require('./routes/authenticate');

app.set('dbUrl', config.db[app.settings.env]);
mongoose.connect(app.get('dbUrl'));

console.log('MongoUrl: ' + app.get('dbUrl'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( (req, res, next) => {
    res.header('Content-Type', 'application/vnd.api+json');
    next();
});

app.use(auth);

app.use( (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            errors: [{
                    success: false,
                    message: 'No access token provided.'
            }]
        });
    }

    jwt.verify(token, config.authSecret, (err, decoded) => {
        if (err) {
            return res.send({ errors: [{ success: false, message: 'Access token not valid.' }] })
        }
        req.decoded = decoded;
        next();
    });
});

app.use(cities);
app.use(countries);
app.use(currencies);
app.use(languages);
app.use(locations);
app.use(regions);

module.exports = app;
