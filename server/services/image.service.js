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
    let placeholders = {
        $name: data.name,
        $path: data.path,
        $comment: data.comment,
        $fromDay: data.fromDay,
        $fromMonth: data.fromMonth,
        $fromYear: data.fromYear,
        $toDay: data.toDay,
        $toMonth: data.toMonth,
        $toYear: data.toYear
    };
    
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO image (name, path, comment, fromDay, fromMonth, fromYear, toDay, toMonth, toYear) " +
            "VALUES ($name, $path, $comment, $fromDay, $fromMonth, $fromYear, $toDay, $toMonth, $toYear)", placeholders, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(Object.assign({}, data, {id: this.lastID}));
            }
        });
    });
};

ImageService.prototype.update = function (id, data) {
    let placeholders = {
        $id: id,
        $name: data.name,
        $path: data.path,
        $comment: data.comment,
        $fromDay: data.fromDay,
        $fromMonth: data.fromMonth,
        $fromYear: data.fromYear,
        $toDay: data.toDay,
        $toMonth: data.toMonth,
        $toYear: data.toYear
    };

    return new Promise((resolve, reject) => {
        db.run("UPDATE image SET name=$name, path=$path, comment=$comment, fromDay=$fromDay, fromMonth=$fromMonth, fromYear=$fromYear, toDay=$toDay, toMonth=$toMonth, toYear=$toYear " +
            "WHERE id=$id", placeholders, (err) => {
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