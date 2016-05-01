'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();

const countries = require('./routes/countries');

app.set('dbUrl', config.db[app.settings.env]);
mongoose.connect(app.get('dbUrl'));

console.log(app.get('dbUrl'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(countries);

module.exports = app;
