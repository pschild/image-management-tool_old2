exports = module.exports = function (expressApp) {
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
};