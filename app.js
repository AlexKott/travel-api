'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();

const countries = require('./routes/countries');
const cities = require('./routes/cities');
const auth = require('./routes/authenticate');

app.set('dbUrl', config.db[app.settings.env]);
mongoose.connect(app.get('dbUrl'));

console.log('MongoUrl: ' + app.get('dbUrl'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(countries);
app.use(cities);
app.use(auth);

module.exports = app;
