const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressApp = express();

exports = module.exports = init;

function init(port) {

    expressApp.get('/images', function (req, res) {
        res.json({success: true});
    });

    expressApp.post('/image', function (req, res) {
        res.json({success: true});
    });

    expressApp.put('/image/:id', function (req, res) {
        res.json({success: true});
    });

    expressApp.delete('/images', function (req, res) {
        res.json({success: true});
    });

    expressApp.use(express.static(path.join(__dirname, '..', 'dist')));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: true}));

    expressApp.listen(port, function () {
        console.log(`App listening at http://localhost:${port}`);
    });
}