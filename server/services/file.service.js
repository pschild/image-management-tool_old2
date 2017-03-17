const path = require('path');
const fsp = require('fs-promise');

var FileService = function () {
};

FileService.prototype.getFilesByPath = function (givenPath) {
    return new Promise((resolve, reject) => {
        // givenPath must be url encoded: C:\Users\john\Desktop => C%3A%5CUsers%5Cjohn%5CDesktop
        fsp.readdir(givenPath, (error, fileNames) => {
            if (error) {
                reject(error);
            } else {
                resolve(fileNames.map((fileName) => {
                    let fullPath = path.join(givenPath, fileName);
                    try {
                        let stats = this.getStatOfFile(fullPath);
                        return {
                            fileName: fileName,
                            fullPath: fullPath,
                            isFile: stats.isFile(),
                            isDirectory: stats.isDirectory(),
                            isImage: this.isImageFile(fileName)
                        };
                    } catch(err) {
                        throw new Error(`Error reading stats of file/folder "${fullPath}": ${err.message}`);
                    }
                }));
            }
        });
    });
};

FileService.prototype.getStatOfFile = function(pathToFile) {
    return fsp.lstatSync(pathToFile);
};

FileService.prototype.isImageFile = function(fileName) {
    return fileName.match(/\.(jpg|jpeg|png|gif)$/i) != null;
};

exports = module.exports = new FileService();