const dbService = require('./db.service.js');
var db = dbService.getDatabaseInstance();

var ImageService = function () {
};

ImageService.prototype.findAll = function () {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM image", function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

ImageService.prototype.findById = function (id) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM image WHERE id=?", +id, function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

ImageService.prototype.findByPathAndName = function (path, name) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM image WHERE path=? AND name=?", [path, name], function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

ImageService.prototype.findByPathAndNames = function (path, imageNames) {
    return new Promise((resolve, reject) => {
        let inStatement = '"' + imageNames.join('","') + '"';
        db.all("SELECT * FROM image WHERE path=? AND name IN (" + inStatement + ")", [decodeURI(path)], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

ImageService.prototype.create = function (data) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO image (name) VALUES (?)", data.name, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(Object.assign({}, data, {id: this.lastID}));
            }
        });
    });
};

ImageService.prototype.update = function (id, data) {
    return new Promise((resolve, reject) => {
        db.run("UPDATE image SET name=? WHERE id=?", [data.name, +id], (err) => {
            if (err) {
                reject(err);
            } else {
                this.findById(id)
                    .then((row) => {
                        resolve(row);
                    })
                    .catch(() => {
                        reject(err);
                    });
            }
        });
    });
};

ImageService.prototype.removeById = function (id) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM image WHERE id=?", +id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({removedId: +id});
            }
        });
    });
};

exports = module.exports = new ImageService();