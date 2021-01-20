const express = require('express');
const { validate } = require('jsonschema');

const router = express.Router();
const db = require('../db/db');

const users = db.get('users');
const cards = db.get('cards')
router.get('/users', (req, res, next) => {
    

    res.json({status: 'OK', data: users});
});

router.get('/users/:id', (req, res, next) => {
    // const users = db.get(users);

    const { id } = req.params; 
    const data = users.find(user => String(user.id) === id);
    
    res.json({status: 'OK', data});
});


router.get('/cards/:id', (req, res, next) => {
    // const cards = db.get(cards);

    const { id } = req.params; 
    const data = cards.find(card => String(card.id) === id);
    
    res.json({status: 'OK', data});
});

router.post('/users', (req, res, next) => {
    // const users = db.get(users);
    const count = users.length;

    const { body } = req;
    const taskShecma = {
        type: 'object',
        properties: {
            login: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['login', 'password'],
        additionalProperties: false
    };

    const validationResult = validate(body, taskShecma);
    if (!validationResult.valid){
        return next(new Error('INVALID_JSON_OR_API_FORMAT'));
    }

    const newUser = { id: count+1, login: body.login, password: body.password };
    try {
        db.get('users') 
          .push(newUser)
          .write();
    } catch (error) {
        throw new Error(error);
    }
    res.json({status: 'OK', data: newUser});
})

router.post('/cards', (req, res, next) => {
    // const cards = db.get(cards);
    const count = cards.length;

    const { body } = req;
    const taskShecma = {
        type: 'object',
        properties: {
            en: { type: 'string' },
            ru: { type: 'string' }
        },
        required: ['en', 'ru'],
        additionalProperties: false
    };

    const validationResult = validate(body, taskShecma);
    if (!validationResult.valid){
        return next(new Error('INVALID_JSON_OR_API_FORMAT'));
    }
    const newCard = { id: count+1, en: body.en, ru: body.ru};
    try {
        db.get('cards') 
          .push(newCard)
          .write();
    } catch (error) {
        throw new Error(error);
    }
    res.json({status: 'OK', data: newCard});
})

module.exports = router;