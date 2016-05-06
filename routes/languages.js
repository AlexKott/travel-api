'use strict';
const express = require('express');
const router = express.Router();
const Language = require('../models/language');

const languageConfig = {
    getAll: '',
    getOne: ''
}

router.route('/languages')
    .get( (req, res) => {
        Language.find({}, languageConfig.getAll, (err, languages) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: languages });
        })
    })
    .post( (req, res) => {
        const language = new Language(req.body.data);

        language.save( (err) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            return res.send({ data: { message: 'Language added.' } });
        });
    });

router.route('/languages/:id')
    .get( (req, res) => {
        Language.findOne({_id: req.params.id}, languageConfig.getOne, (err, language) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: language });
        });
    })
    .patch( (req, res) => {
        Language.findOneAndUpdate({_id: req.params.id}, req.body.data, { new: true }, (err, language) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            res.send({ data: language });
        });
    })
    .delete( (req, res) => {
        Language.findOneAndRemove({_id: req.params.id}, (err, language) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            }
            if (!language) {
                return res.send({ errors: [{ message: `Not found!` }]})
            }
            res.send({ data: { message: `Language ${language._id} deleted!`} });
        });
    });

module.exports = router;
