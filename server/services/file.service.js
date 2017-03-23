const path = require('path');
const fsp = require('fs-promise');
const drivelist = require('drivelist');

var FileService = function () {
};

FileService.prototype.getFilesByPath = function (givenPath) {
    if (givenPath === process.env.SystemDrive) {
        givenPath += '/';
    }

    if (!givenPath || givenPath === '') {
        return new Promise((resolve, reject) => {
            resolve(
                [
                    {
                        fileName: 'C:',
                        path: 'C:/',
                        fullPath: 'C:/',
                        isFile: false,
                        isDirectory: true,
                        isImage: false
                    },
                    {
                        fileName: 'D:',
                        path: 'D:/',
                        fullPath: 'D:/',
                        isFile: false,
                        isDirectory: true,
                        isImage: false
                    }
                ]
            );
        });
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

/**
 * Example response (see https://github.com/resin-io-modules/drivelist for further instructions):
 * [
 *   {
 *      "device":"\\\\.\\PHYSICALDRIVE0",
 *      "description":"SAMSUNG SSD PM830 2.5\" 7",
 *      "size":256052966400,
 *      "raw":"\\\\.\\PHYSICALDRIVE0",
 *      "system":true,
 *      "protected":false,
 *      "mountpoints":[
 *          {"path":"C:"}
 *      ]
 *   },
 *   {
 *      ...
 *   }
 * ]
 */
FileService.prototype.getSystemDrives = function () {
    drivelist.list((error, drives) => {
        if (error) {
            throw error;
        }
        return drives;
    });
};

FileService.prototype.getStatOfFile = function(pathToFile) {
    return fsp.lstatSync(pathToFile);
};

FileService.prototype.isImageFile = function(fileName) {
    return fileName.match(/\.(jpg|jpeg|png|gif)$/i) != null;
};

exports = module.exports = new FileService();