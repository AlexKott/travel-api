'use strict';
const express = require('express');
const router = express.Router();
const Language = require('../models/language');

const createStringId = require('../utils/createStringId');
const isValid = require('../utils/isValid');

const languageConfig = {
    getAll: '-_id',
    getOne: '-_id'
}

router.route('/languages')
    .get( (req, res) => {
        Language.find({}, languageConfig.getAll, (err, languages) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: languages });
        })
    })

    .post( (req, res) => {
        const language = new Language(req.body.data);

        language.id = createStringId.base(language.name);
        isValid.language(language.id)
            .then( () => {
                language.save( (err, l) => {
                    if (err) {
                        return res.status(500).send({ errors: [{ detail: err }]});
                    }
                    res.status(201).send({ data: l });
                });
            })
            .catch( () => {
                res.status(409)
                    .send({ errors: [{
                        detail: 'Language already exists!',
                        source: { pointer: 'languages' }
                    }]});
            });
    });

router.route('/languages/:id')
    .get( (req, res) => {
        Language.findOne({id: req.params.id}, languageConfig.getOne,
                        (err, language) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            }
            res.send({ data: language });
        });
    })

    .patch( (req, res) => {
        Language.findOneAndUpdate({id: req.params.id}, req.body.data, { new: true },
                                (err, language) => {
            if (err) {
                return res.send({ errors: [{ status: 500, detail: err }]});
            } else if (!language) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.send({ data: language });
        });
    })

    .delete( (req, res) => {
        Language.findOneAndRemove({id: req.params.id}, (err, language) => {
            if (err) {
                return res.status(500).send({ errors: [{ detail: err }]});
            } else if (!language) {
                return res.status(404)
                    .send({ errors: [{ detail: `${req.params.id} not found!` }]});
            }
            res.status(204).send();
        });
    });

module.exports = router;
