const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressApp = express();

const dbService = require('./services/db.service.js');

exports = module.exports = init;

function init(port) {

    dbService.create();

    expressApp.use(express.static(path.join(__dirname, '..')));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: true}));

    require('./routes/files')(expressApp);
    require('./routes/images')(expressApp);

    expressApp.listen(port, function () {
        console.log(`App listening at http://localhost:${port}`);
    });
}