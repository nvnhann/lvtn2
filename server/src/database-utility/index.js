module.exports = {
    sequelizeDynamic: (config) => require('./config').sequelize(config),
    sequelize: () => require('./config').sequelize(),
    utils: require('./utils')
}