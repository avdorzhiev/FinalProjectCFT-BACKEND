const express = require('express');

const { validate } = require('jsonschema');

const router = express.Router();
const db = require('../db/db');
const users = db.get('users');

router.get('/users', (req, res, next) => {
    res.json({ status: 'OK', users: users });
});

router.get('/users/:id', (req, res, next) => {
    const { id } = req.params;
    const user = users.find(user => String(user.id) === id);

    res.json({ status: 'OK', user });
});

router.post('/users', (req, res, next) => {
    const count = users.size;
    console.log('c', users)

    // let asd = users.map(el => el)
    // console.log('users', asd)

    const { body } = req;
    const taskShecma = {
        type: 'object',
        properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['id', 'username', 'password'],
        additionalProperties: false
    };

    const validationResult = validate(body, taskShecma);
    if (!validationResult.valid) {
        return next(new Error('INVALID_JSON_OR_API_FORMAT'));
    }
    console.log('count', count)
    const newUser = { id: body.id, username: body.username, password: body.password };
    const user = users.find(user => String(user.id) === id);
    try {
        db.get('users')
            .push(newUser)
            .write();
    } catch (error) {
        throw new Error(error);
    }
    res.json({ status: 'OK', newUser: newUser });
})

router.patch('/users/:id', (req, res, next) => {
    const { id } = req.params;

    const editedTask = db
        .get('users')
        .find({ id })
        .assign(req.body)
        .value();
        
    db.write();

    console.log(req.body)

    res.json({ status: 'OK', data: editedTask });
})

module.exports = router;