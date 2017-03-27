const sqlite3 = require('sqlite3').verbose();
const path = require('path');

var DatabaseService = function () {
    this._db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'image-management-tool.db'));
};

DatabaseService.prototype.create = function () {
    this._db.serialize(() => {
        this._db.run("CREATE TABLE if not exists image (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, path TEXT)", [], (error) => {
            if (error) {
                throw new Error(`Error during creation of table: ${error}`);
            }
        });

        this._db.run("CREATE TABLE if not exists tag (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT)", [], (error) => {
            if (error) {
                throw new Error(`Error during creation of table: ${error}`);
            }
        });

        this._db.run("CREATE TABLE if not exists image_tags (imageId INTEGER NOT NULL, tagId INTEGER NOT NULL)", [], (error) => {
            if (error) {
                throw new Error(`Error during creation of table: ${error}`);
            }
        });
    });

    this._db.serialize(() => {
        this._db.run("CREATE UNIQUE INDEX `image-tags-unique-constr` ON image_tags (imageId ,tagId)", [], (error) => {
            if (error) {
                throw new Error(`Error during creation of index: ${error}`);
            }
        });
    });
};

DatabaseService.prototype.getDatabaseInstance = function() {
    return this._db;
};

exports = module.exports = new DatabaseService();