const path = require('path');
const fsp = require('fs-promise');

var FileService = function () {
};

FileService.prototype.getFilesByPath = function (givenPath) {
    if (givenPath === process.env.SystemDrive) {
        givenPath += '/';
    }

    return new Promise((resolve, reject) => {
        // givenPath must be url encoded: C:\Users\john\Desktop => C%3A%5CUsers%5Cjohn%5CDesktop
        fsp.readdir(givenPath, (error, fileNames) => {
            if (error) {
                reject(error);
            } else {
                let fileList = [];
                fileNames.forEach((fileName) => {
                    let fullPath = path.join(givenPath, fileName);
                    try {
                        let stats = this.getStatOfFile(fullPath);
                        fileList.push({
                            fileName: fileName,
                            path: givenPath,
                            fullPath: fullPath,
                            isFile: stats.isFile(),
                            isDirectory: stats.isDirectory(),
                            isImage: this.isImageFile(fileName)
                        });
                    } catch (error) {
                        console.log(fileName, error.message);
                    }
                });
                resolve(fileList);
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