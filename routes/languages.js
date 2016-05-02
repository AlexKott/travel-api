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
                return res.send({ errors: [ err ] });
            }
            res.send({ data: languages });
        })
    })
    .post( (req, res) => {
        const language = new Language(req.body);

        language.save( (err) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            return res.send({ data: { message: 'Language added.' } });
        });
    });

router.route('/languages/:id')
    .get( (req, res) => {
        Language.findOne({_id: req.params.id}, languageConfig.getOne, (err, language) => {
            if (err) {
                return res.send({ errors: [ err ] });
            }
            res.send({ data: language });
        });
    })

module.exports = router;
