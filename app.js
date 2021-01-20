const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const tasksRotues = require('./routes/tasks');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/', tasksRotues);
app.get('/', (req, res) => {
    res.send('Welcome to my project!');
});

app.use((err, req, res, next) => {
    const { message } = err;
    res.json({status: 'ERROR', message});
});

app.listen(8080, () => console.log('listening on http://localhost8080/'))