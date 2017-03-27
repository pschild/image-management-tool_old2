const tagService = require('../services/tag.service');

exports = module.exports = function (expressApp) {
    expressApp.get('/tags', function (req, res) {
        tagService.findAll()
            .then((tags) => {
                res.json({tags: tags});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.get('/tag/:id', function (req, res) {
        tagService.findById(+req.params.id)
            .then((tag) => {
                res.json({tag: tag});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.post('/tag', function (req, res) {
        tagService.create(req.body)
            .then((tag) => {
                res.json({tag: tag});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.put('/tag/:id', function (req, res) {
        tagService.update(+req.params.id, req.body)
            .then((tag) => {
                res.json({tag: tag});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });

    expressApp.delete('/tag/:id', function (req, res) {
        tagService.removeById(+req.params.id)
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });
};