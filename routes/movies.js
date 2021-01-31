const { json } = require('body-parser');
const express = require('express');
const { validate } = require('jsonschema');
const { request } = require('request');
const fetch = require('node-fetch')
const rp = require('request-promise');

const router = express.Router();

router.get('/movies/:s', (req, res, next) => {
    const movies = [];
    const { s } = req.params
    rp('https://www.omdbapi.com/?s=' + s + '&apikey=thewdb')
        .then(response => JSON.parse(response))
        .then(results => {
            const promises = [];

            for (let i = 0; i < results['Search'].length; i++) {
                promises.push(rp('https://www.omdbapi.com/?i=' + results['Search'][i]['imdbID'] + '&apikey=thewdb')
                    .then(data => {
                        movies.push(data)
                    }))
            }
            Promise.all(promises).then(() => {
                console.log(movies)
                res.json({ status: 'OK', movies: movies });
            })
        })
})

router.get('/movies/id/:id', (req, res, next) => {
    const { id } = req.params
    console.log('search')
    rp('https://www.omdbapi.com/?i=' + id + '&apikey=thewdb')
        .then(response => res.json({ status: 'OK', movies: response }));
});

module.exports = router;