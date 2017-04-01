var Model = require('./../models/Image');

var ImageService = function () {
};

ImageService.prototype.findAll = function () {
    return Model.Images
        .forge()
        .fetch({ withRelated: 'tags' });
};

ImageService.prototype.findById = function (id) {
    return Model.Image
        .forge()
        .where('id', id)
        .fetch({ withRelated: 'tags' });
};

ImageService.prototype.findByPathAndName = function (path, name) {
    return Model.Images
        .forge()
        .query('where', {path: decodeURI(path), name: name})
        .fetchOne({ withRelated: 'tags' });
};

ImageService.prototype.findByPathAndNames = function (path, imageNames) {
    return Model.Images
        .forge()
        .query(function(qb) {
            qb.select('*');
            qb.where(function () {
                this.where('path', decodeURI(path));
            });
            qb.andWhere(function () {
                this.where('name', 'in', imageNames);
            });
        })
        .fetch({ withRelated: 'tags' });
};

ImageService.prototype.create = function (data) {
    return Model.Image.forge({
        name: data.name,
        path: decodeURI(data.path),
        comment: data.comment,
        fromDay: data.fromDay,
        fromMonth: data.fromMonth,
        fromYear: data.fromYear,
        toDay: data.toDay,
        toMonth: data.toMonth,
        toYear: data.toYear
    })
        .save()
        .then((image) => {
            image.tags().attach(data.tags.map(tag => tag.id));
            return image;
        })
        .then((image) => {
            return this.findById(image.id);
        });
};

ImageService.prototype.update = function (id, data) {
    return Model.Image
        .forge({id: id})
        .fetch({require: true})
        .then((image) => {
            return image.save({
                name: data.name || image.get('name'),
                path: data.path ? decodeURI(data.path) : image.get('path'),
                comment: data.comment || image.get('comment'),
                fromDay: data.fromDay || image.get('fromDay'),
                fromMonth: data.fromMonth || image.get('fromMonth'),
                fromYear: data.fromYear || image.get('fromYear'),
                toDay: data.toDay || image.get('toDay'),
                toMonth: data.toMonth || image.get('toMonth'),
                toYear: data.toYear || image.get('toYear')
            });
        })
        .then((image) => {
            // detach everything ...
            image.related('tags').detach();
            // ... and attach the given:
            image.tags().attach(data.tags.map(tag => tag.id));
            return image;
        })
        .then((image) => {
            return this.findById(image.id);
        });
};

ImageService.prototype.removeById = function (id) {
    return Model.Image
        .forge({id: id})
        .fetch({require: true})
        .then((image) => {
            return image.destroy();
        })
        .then(() => {
            return {removedId: +id};
        });
};

exports = module.exports = new ImageService();