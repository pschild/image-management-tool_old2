const imageService = require('../services/image.service');

exports = module.exports = function (expressApp) {
    expressApp.get('/images', function (req, res) {
        imageService.findAll()
            .then((images) => {
                res.json({images: images});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.get('/image/:id', function (req, res) {
        imageService.findById(+req.params.id)
            .then((image) => {
                res.json({image: image});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.get('/image/:path/:name', function (req, res) {
        imageService.findByPathAndName(req.params.path, req.params.name)
            .then((image) => {
                res.json({image: image});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.post('/image', function (req, res) {
        imageService.create(req.body)
            .then((image) => {
                res.json({image: image});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.put('/image/:id', function (req, res) {
        imageService.update(+req.params.id, req.body)
            .then((image) => {
                res.json({image: image});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.delete('/image/:id', function (req, res) {
        imageService.removeById(+req.params.id)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });
};