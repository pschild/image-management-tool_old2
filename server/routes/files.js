const fileService = require('../services/file.service');

exports = module.exports = function (expressApp) {
    expressApp.get('/files/:path?', function (req, res) {
        fileService.getFilesByPath(req.params.path)
            .then((files) => {
                res.json({files: files});
            })
            .catch((error) => {
                res.json({success: false, error: error});
            });
    });
};