module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        user_id: {
			type: DataTypes.STRING,
		},
		xp: {
            type: DataTypes.INTEGER,
            defaultValue: 1

        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
		uyarı: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allownull: false,
		},
		server: {
			type: DataTypes.STRING,
			allownull: false
		},
	},{
		timestamps: false,
	});
};