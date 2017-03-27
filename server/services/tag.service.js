const dbService = require('./db.service.js');
var db = dbService.getDatabaseInstance();

var TagService = function () {
};

TagService.prototype.findAll = function () {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM tag", function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

TagService.prototype.findById = function (id) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM tag WHERE id=?", +id, function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

TagService.prototype.create = function (data) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO tag (name) VALUES (?)", data.name, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(Object.assign({}, data, {id: this.lastID}));
            }
        });
    });
};

TagService.prototype.update = function (id, data) {
    return new Promise((resolve, reject) => {
        db.run("UPDATE tag SET name=? WHERE id=?", [data.name, +id], (err) => {
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

TagService.prototype.removeById = function (id) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM tag WHERE id=?", +id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({removedId: +id});
            }
        });
    });
};

exports = module.exports = new TagService();