module.exports = (sequelize, DataTypes) => {
    return sequelize.define('levels', {
		level: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		taban: {
			type: DataTypes.INTEGER,
		},
		üst: {
			type: DataTypes.INTEGER,
		},
	},{
		timestamps: false,
	});
};