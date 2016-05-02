'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../config').authSecret;

const validCredentials = { // change this to user model if needed
    name: 'traveller',
    password: 'voyage'
};

router.post('/authenticate', (req, res) => {
    const givenName = req.body.name;
    const givenPassword = req.body.password;

    if (givenName !== validCredentials.name) {
        return res.send({ errors: [{ success: false, message: 'Authentication failed. User not found.' }] });
    }
    if (givenPassword !== validCredentials.password) {
        return res.send({ errors: [{ success: false, message: 'Authentication failed. Wrong password' }] });
    }

    const token = jwt.sign(validCredentials, secret, { expiresIn: '7d' });

    return res.send({ data: {
        success: true,
        message: 'Authentication successful',
        token: token
    } });
});

module.exports = router;
