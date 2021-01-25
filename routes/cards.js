const express = require('express');
const { validate } = require('jsonschema');

const router = express.Router();
const db = require('../db/db');

const cards = db.get('cards')

router.get('/cards', (req, res, next) => {
    res.json({status: 'OK', cards: cards});
});

router.get('/cards/:id', (req, res, next) => {
    // const cards = db.get(cards);

    const { id } = req.params; 
    const card = cards.find(card => String(card.id) === id);
    
    res.json({status: 'OK', card: card});
});

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
    res.json({status: 'OK', newCard: newCard});
})

module.exports = router;