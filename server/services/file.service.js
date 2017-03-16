const path = require('path');
const fsp = require('fs-promise');

var FileService = function() {};

FileService.prototype.getFilesByPath = function(givenPath) {
    return new Promise((resolve, reject) => {
        // givenPath must be url encoded: C:\Users\john\Desktop => C%3A%5CUsers%5Cjohn%5CDesktop
        fsp.readdir(givenPath, (error, fileNames) => {
            if (error) {
                reject(error);
            } else {
                resolve(fileNames.map((fileName) => {
                    return {
                        fileName: fileName,
                        fullPath: path.join(givenPath, fileName)
                    };
                }));
            }
        });
    });
};

exports = module.exports = new FileService();