const path = require('path');

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '..', 'db', 'image-management-tool.db')
    },
    debug: true,
    useNullAsDefault: true
});
var bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;