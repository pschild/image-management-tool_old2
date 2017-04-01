var Model = require('./../models/Tag');

var TagService = function () {
};

TagService.prototype.findAll = function () {
    return Model.Tag
        .forge()
        .fetchAll();
};

TagService.prototype.findById = function (id) {
    return Model.Tag
        .forge()
        .where('id', id)
        .fetch();
};

TagService.prototype.create = function (data) {
    return Model.Tag.forge({
        name: data.name
    }).save();
};

TagService.prototype.update = function (id, data) {
    return Model.Tag
        .forge({id: id})
        .fetch({require: true})
        .then((tag) => {
            tag.save({
                name: data.name || tag.get('name')
            });
        })
        .then(() => {
            return this.findById(id);
        });
};

TagService.prototype.removeById = function (id) {
    return Model.Tag
        .forge({id: id})
        .fetch({require: true})
        .then((tag) => {
            return tag.destroy();
        })
        .then(() => {
            return {removedId: +id};
        });
};

exports = module.exports = new TagService();