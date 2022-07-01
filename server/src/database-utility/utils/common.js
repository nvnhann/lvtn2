module.exports = {
    save: (model, data) => {
        return model.create(data);
    },
    update: (model, condition, data) => {
        return model.update(data, condition);
    },
    bulkSave: (model, dataArr) => {
        return model.bulkCreate(dataArr, { returning: true });
    },
    delete: (model, query) => {
        return model.destroy(query);
    },
    findByPk: (model, id) => {
        return model.findByPk(id);
    },
    findOne: (model, query) => {
        return model.findOne(query);
    },
    findAll: (model, query = '') => {
        return query !== '' && query !== undefined ? model.findAll(query) : model.findAll();
    },
    count: (model, query = '') => {
        return query !== '' && query !== undefined ? model.count(query) : model.count();
    },
    max: (model, attribute, query = '') => {
        return query !== '' && query !== undefined ? model.max(attribute, query) : model.max(attribute);
    },
    min: (model, attribute, query = '') => {
        return query !== '' && query !== undefined ? model.min(attribute, query) : model.min(attribute);
    },
    sum: (model, attribute, query = '') => {
        return query !== '' && query !== undefined ? model.sum(attribute, query) : model.sum(attribute);
    }
}