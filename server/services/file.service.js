const path = require('path');
const fsp = require('fs-promise');
const drivelist = require('drivelist');

var FileService = function () {
};

FileService.prototype.getFilesByPath = function (givenPath) {
    if (!givenPath || givenPath === '') {
        return new Promise((resolve, reject) => {
            this.getSystemDrives()
                .then((systemDrives) => {
                    resolve(systemDrives);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

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

FileService.prototype.getSystemDrives = function () {
    return new Promise((resolve, reject) => {
        drivelist.list((error, driveList) => {
            if (error) {
                reject(error);
            }

            let driveDirectories = [];
            driveList.forEach((driveInfo) => {
                let mountpoints = driveInfo.mountpoints;
                mountpoints.forEach((mountpoint) => {
                    driveDirectories.push({
                        fileName: mountpoint.path,
                        path: mountpoint.path + '/',
                        fullPath: mountpoint.path + '/',
                        isFile: false,
                        isDirectory: true,
                        isImage: false
                    });
                });
            });
            resolve(driveDirectories);
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