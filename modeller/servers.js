module.exports = (sequelize, DataTypes) => {
    return sequelize.define('servers', {
        sunucu_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		prefix: {
			type: DataTypes.STRING,
			defaultValue: "!"

        },
        sunucu_adı: {
            type: DataTypes.STRING,
        },
		xp_puan: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
			allownull: false,
		},
		uyarı_limit: {
			type: DataTypes.INTEGER,
			defaultValue: 15,
			allownull: false,
		},
	    hoşgeldin: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
		hoşgeldin_mesaj: {
			type: DataTypes.STRING,
			defaultValue: "<server> sunucsuna hoşgeldin <user>!",
		},
		hoşgeldin_kanal: {
			type: DataTypes.STRING,
		},
		exit: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
		exit_mesaj: {
			type: DataTypes.STRING,
			defaultValue: "<user> <server> sunucsuna veda etti..",
		},
		exit_kanal: {
			type: DataTypes.STRING,
		},
		level: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
		level_mesaj: {
			type: DataTypes.STRING,
			defaultValue: "<level> seviyesine atladın <user>! Tebrik ederim!",
		},
		level_kanal: {
			type: DataTypes.STRING,
		},

	},{
		timestamps: false,
	});
};