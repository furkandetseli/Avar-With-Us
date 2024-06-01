module.exports = (sequelize, DataTypes) => {
    return sequelize.define('rols', {
		level: {
            type: DataTypes.STRING,
            primaryKey: true,
		},
		rol_id: {
			type: DataTypes.STRING,
		},
		server_id: {
			type: DataTypes.STRING,
		},
	},{
		timestamps: false,
	});
};