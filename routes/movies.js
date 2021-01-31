const express = require('express');
const { validate } = require('jsonschema');
const { request } = require('request');
const rp = require('request-promise');
 
const router = express.Router();

router.get('/movies', (req, res, next) => {
    rp('https://www.omdbapi.com/?s='+'Iron'+'&apikey=thewdb')
    .then(response => res.json({status: 'OK', movies: response}));
});

router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    rp('https://www.omdbapi.com/?i='+results['Search'][id]['imdbID']+'&apikey=thewdb')
    .then(response => res.json({status: 'OK', movies: response}));
});

module.exports = router;