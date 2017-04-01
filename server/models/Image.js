var bookshelf = require('./../config/db').bookshelf;
var Tag = require('./Tag').Tag;

var Image = bookshelf.Model.extend({
    tableName: 'image',
    tags: function() {
        return this.belongsToMany(Tag, 'image_tag', 'image_id', 'tag_id');
    }
});

var Images = bookshelf.Collection.extend({
    model: Image
});

module.exports = {
    Image: Image,
    Images: Images
};