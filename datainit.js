const Sequelize = require('sequelize');
const sequelize = new Sequelize('database','username','password',{
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

let servers = require('./modeller/servers')(sequelize, Sequelize.DataTypes);
let users = require('./modeller/users')(sequelize, Sequelize.DataTypes);
let levels = require('./modeller/levels')(sequelize, Sequelize.DataTypes);
let rols = require('./modeller/rols')(sequelize, Sequelize.DataTypes);
let uyarılar = require('./modeller/uyarılar')(sequelize, Sequelize.DataTypes);
let yetkiler = require('./modeller/yetkilers')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async () => {
	const ürünler = [
		servers.upsert({sunucu_id: "727285431607230535", sunucu_adı: "Avaristan 51. Bölge",prefix: "!", xp_puan: 1, hoşgeldin: 0})
	];
	await Promise.all(ürünler)
	await levels.create({level: 0, taban: 0, üst: 150})
	for(a = 1; a < 10; a++) {
		let tabans = await levels.findOne({where: {level: (a-1)}})
		let kat = (Number((a+1))/10)+1.5
		let üstlevel = Math.ceil(((a+1)*100)*kat)
		await levels.create({level: a, taban: tabans.üst, üst: üstlevel})
	}
	console.log('Database oluştu!');
	sequelize.close();


}).catch(console.error);