const express = require('express');

const { validate } = require('jsonschema');

const router = express.Router();
const db = require('../db/db');
const users = db.get('users');

router.get('/users', (req, res, next) => {
    res.json({status: 'OK', users: users});
});

router.get('/users/:id', (req, res, next) => {
    const { id } = req.params; 
    const user = users.find(user => String(user.id) === id);
    
    res.json({status: 'OK', user});
});

router.post('/users', (req, res, next) => {
    const count = users.length;

    const { body } = req;
    const taskShecma = {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['username', 'password'],
        additionalProperties: false
    };

    const validationResult = validate(body, taskShecma);
    if (!validationResult.valid){
        return next(new Error('INVALID_JSON_OR_API_FORMAT'));
    }

    const newUser = { id: count+1, username: body.username, password: body.password };
    try {
        db.get('users') 
          .push(newUser)
          .write();
    } catch (error) {
        throw new Error(error);
    }
    res.json({status: 'OK', newUser: newUser});
})

module.exports = router;