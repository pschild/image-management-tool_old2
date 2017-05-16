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

bookshelf.knex.schema.createTableIfNotExists('image', function(table) {
    table.increments();
    table.string('name');
    table.string('path');
    table.text('comment');
    table.integer('fromDay');
    table.integer('fromMonth');
    table.integer('fromYear');
    table.integer('toDay');
    table.integer('toMonth');
    table.integer('toYear');
}).then(function() {
    console.log('table created successfully.');
});

bookshelf.knex.schema.createTableIfNotExists('tag', function(table) {
    table.increments();
    table.string('name');
}).then(function() {
    console.log('table created successfully.');
});

bookshelf.knex.schema.createTableIfNotExists('image_tag', function(table) {
    table.integer('image_id');
    table.integer('tag_id');
}).then(function() {
    console.log('table created successfully.');
});

module.exports.bookshelf = bookshelf;