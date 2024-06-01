module.exports = (sequelize, DataTypes) => {
    return sequelize.define('yetkilers', {
        rol_id: {
			type: DataTypes.STRING,
        },
        yetki_türü: {
            type: DataTypes.STRING,

        },
		server_id: {
			type: DataTypes.STRING,
		},
	},{
		timestamps: false,
	});
};