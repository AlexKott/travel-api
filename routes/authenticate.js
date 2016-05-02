'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const validCredentials = { // change this to user model if needed
    name: 'traveller',
    password: 'voyage'
};

router.post('/authenticate', (req, res) => {
    const givenName = req.body.name;
    const givenPassword = req.body.password;

    if (givenName !== validCredentials.name) {
        return res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    if (givenPassword !== validCredentials.password) {
        return res.json({ success: false, message: 'Authentication failed. Wrong password' })
    }

    const token = jwt.sign(validCredentials, secret, { expiresIn: '2m' });

    return res.json({
        success: true,
        message: 'Authentication successful',
        token: token
    });
});

module.exports = router;
