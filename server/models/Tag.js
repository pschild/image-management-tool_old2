var bookshelf = require('./../config/db').bookshelf;
var Image = require('./Image').Image;

var Tag = bookshelf.Model.extend({
    tableName: 'tag',
    images: function() {
        return this.belongsToMany(Image, 'image_tag', 'tag_id', 'image_id');
    }
});

module.exports = {
    Tag: Tag
};