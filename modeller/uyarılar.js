module.exports = (sequelize, DataTypes) => {
    return sequelize.define('uyarılar', {
        user_id: {
			type: DataTypes.STRING,
		},
		uyarı_no: {
            type: DataTypes.INTEGER,
            defaultValue: 1

        },
        uyarı_neden: {
            type: DataTypes.STRING,
        },
		uyaran_yetkili: {
			type: DataTypes.STRING,
			allownull: false,
		},
		tarih: {
			type: DataTypes.STRING,
			allownull: false,
		},
		server_id: {
			type: DataTypes.STRING,
			allownull: false
		},
	},{
		timestamps: false,
	});
};