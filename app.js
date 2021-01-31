const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRotues = require('./routes/users');
const cardsRoutes = require('./routes/movies');

const00 = require('child_process').execSync;
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount - 1; i++) {
        cluster.fork();
    }
} else {
    const app = express();

    app.use(morgan('combined'));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
      });
    
    app.use('/', usersRotues);
    app.use('/', cardsRoutes);
    
    app.get('/', (req, res) => {
        res.send('Welcome to my project!');
    });

    app.use((err, req, res, next) => {
        const { message } = err;
        res.json({ status: 'ERROR', message });
    });

    app.listen(8000, () => console.log('listening on http://localhost:8000/'))
}