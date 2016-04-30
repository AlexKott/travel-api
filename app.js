'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const countries = require('./routes/countries');

const dbName = 'test';
const connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(countries);

module.exports = app;
