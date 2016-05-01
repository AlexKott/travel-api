'use strict';
const express = require('express');
const router = express.Router();
const Language = require('../models/language');

const languageConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/languages')
    .get( (req, res) => {
        Language.find({}, languageConfig.getAll, (err, languages) => {
            if (err) {
                return res.send(err);
            }
            res.json(languages);
        })
    })
    .post( (req, res) => {
        const language = new Language(req.body);

        language.save( (err) => {
            if (err) {
                return res.send(err);
            }
            return res.send({ message: 'Language added.' });
        });
    });

router.route('/languages/:id')
    .get( (req, res) => {
        Language.findOne({id: req.params.id}, languageConfig.getOne, (err, language) => {
            if (err) {
                return res.send(err);
            }
            res.json(language);
        });
    })

module.exports = router;
