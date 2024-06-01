const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const servers = require('./modeller/servers')(sequelize, Sequelize.DataTypes);
let users = require('./modeller/users')(sequelize, Sequelize.DataTypes);
let levels = require('./modeller/levels')(sequelize, Sequelize.DataTypes);
let rols = require('./modeller/rols')(sequelize, Sequelize.DataTypes);
let uyarılar = require('./modeller/uyarılar')(sequelize, Sequelize.DataTypes);
let yetkilers = require('./modeller/yetkilers')(sequelize, Sequelize.DataTypes);


module.exports = {servers, users, levels, rols,uyarılar,yetkilers}