const sqlite3 = require('sqlite3').verbose();

var DatabaseService = function () {
    this._db = new sqlite3.Database('image-management-tool.db');
};

DatabaseService.prototype.create = function () {
    return new Promise((resolve, reject) => {
        this._db.serialize(() => {
            this._db.run("CREATE TABLE if not exists image (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, path TEXT)", [], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    });
};

DatabaseService.prototype.getDatabaseInstance = function() {
    return this._db;
};

exports = module.exports = new DatabaseService();