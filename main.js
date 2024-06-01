const Discord = require('discord.js');
const {token} = require('./config.json')
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const {servers,users,levels,rols} = require('./objeler');
const { Op } = require('sequelize');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', async () => {
	const activities_list = [
		"Avar Halkını", 
		"Instagram: @Avarball",
		"#AvarWithUs",
		"Avar Halkını",
		"Instagram: @Avarball",
		"#AvarWithUs",
		"Avar Halkını",
	];
	setInterval(() => {
		const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
		client.user.setActivity(activities_list[index], {type: "WATCHING"}); // sets bot's activities to one of the phrases in the arraylist.
	}, 3000);
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();
	console.log(`${client.user.tag} aktif! Saat: ${year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}`);
});

client.on('guildMemberAdd', async member => {
	const server = await servers.findOne({where: {sunucu_id: member.guild.id}})
	let mesaj = server.hoşgeldin_mesaj
	if(mesaj.indexOf("<user>") != -1){
		mesaj = mesaj.replace("<user>",`${member}`)
	}
	if(mesaj.indexOf("<server>") != -1){
		mesaj = mesaj.replace("<server>",`${member.guild.name}`)
	}
	const channel = member.guild.channels.cache.find(ch => ch.id === `${server.exit_kanal}`);
	if(channel){
		channel.send(mesaj);
	}else{
		const defaultChannel = member.guild.channels.cache.find(channel => channel.permissionsFor(member.guild.me).has("SEND_MESSAGES"));
    	defaultChannel.send(mesaj);
	}
});

client.on('guildMemberRemove', async member => {
	const server = await servers.findOne({where: {sunucu_id: member.guild.id}})
	let mesaj = server.exit_mesaj
	if(mesaj.indexOf("<user>") != -1){
		mesaj = mesaj.replace("<user>",`${member}`)
	}
	if(mesaj.indexOf("<server>") != -1){
		mesaj = mesaj.replace("<server>",`${member.guild.name}`)
	}
	const channel = member.guild.channels.cache.find(ch => ch.id === `${server.exit_kanal}`);
	if(channel){
		channel.send(mesaj);
	}else{
		const defaultChannel = member.guild.channels.cache.find(channel => channel.permissionsFor(member.guild.me).has("SEND_MESSAGES"));
    	defaultChannel.send(mesaj);
	}
	
});

client.on('message', async message => {
	if(message.content == "sa" || message.content == "Sa" || message.content == "Selamın Aleyküm" || message.content == "selamın aleyküm" || message.content == "sea" || message.content == "Sea" || message.content == "selamınaleyküm" || message.content == "Selamın aleyküm"){
		message.react('🇦').then(() => message.react('🇸'))
	}
})
client.api.applications("746094319576023141").commands.post({data: {
	name: 'furkan',
	description: 'ping pong!'
}})
client.ws.on('INTERACTION_CREATE', async interaction => {
	const command = interaction.data.name.toLowerCase();
	const args = interaction.data.options;



	if(command == "furkan") {
		
		const embed = new Discord.MessageEmbed()
			.setTitle("Furkan diyor ki;")
			.setDescription('Yüce avarlar biz vergi ö- \nÖNEMLİ NOT! BU MESAJ VERGİSİ ÖDENMEDİĞİ İÇİN SANSÜRLENMİŞTİR!')
			.setAuthor(interaction.member.user.username);

		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: await createAPIMessage(interaction, embed)
			}
		});
	}
})

async function createAPIMessage(interaction, content) {
const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
	.resolveData()
	.resolveFiles();

return { ...apiMessage.data, files: apiMessage.files };
}
client.on('message', async message => {
	if (message.author.bot) return;
	let sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
	if(!sunucu){
		await servers.create({sunucu_id: message.guild.id,sunucu_adı: message.guild.name, prefix: "!"})
		await levels.create({level: 0, taban: 0, üst: 150, rol: 0, server_id: message.guild.id})
		
	}
	const server = await servers.findOne({where: {sunucu_id: message.guild.id}})
	let puan = Number(server.xp_puan)
	const kişi = await users.findOne({where: {user_id: message.author.id, server: message.guild.id}})
	if(!kişi){
		users.create({user_id: message.author.id, server: message.guild.id})
	}else{
		const level = await levels.findOne({where: {level: kişi.level}})
		if(puan>100){
			for(a = 1; a <= (puan/20); a++) {
				kişi.xp += 20
				kişi.save()
			}
		}else{
			kişi.xp += puan
			kişi.save()
		}
		if(kişi.xp >= level.üst){
			kişi.level += 1
			kişi.save()
			const ilevel = await levels.findOne({where: {level: kişi.level}})
			if(!ilevel || ilevel){
				let levelq = kişi.level
				const eskilevel = await levels.findOne({where: {level: (levelq-1)}})
				if(!eskilevel){
					let kat = (Number(((levelq-1)+1))/10)+1.5
					let üstlevel = Math.ceil(((levelq-1)+1)*100)*kat
					await levels.upsert({level: (levelq-1), üst: üstlevel})
				}
				const elevel = await levels.findOne({where: {level: (levelq-1)}})
				let kat = (Number((levelq+1))/10)+1.5
				let üstlevel = Math.ceil(((levelq+1)*100)*kat)
				await levels.upsert({level: levelq, taban: elevel.üst, üst: üstlevel})
			}
			let rol = await rols.findOne({where: {level: kişi.level, server_id: message.guild.id}})
			if(rol){
				const role = message.guild.roles.cache.find(role => role.id === `${rol.rol_id}`);
				message.member.roles.add(role);
			}
			const levelup = await servers.findOne({where: {sunucu_id: message.guild.id}})
			let mesaj = levelup.level_mesaj
					if(mesaj.indexOf("<user>") != -1){
						mesaj = mesaj.replace("<user>",`${message.author}`)
					}
					if(mesaj.indexOf("<server>") != -1){
						mesaj = mesaj.replace("<server>",`${message.guild.name}`)
					}
					if(mesaj.indexOf("<level>") != -1){
						mesaj = mesaj.replace("<level>",`${kişi.level}`)
					}
			const channel = message.guild.channels.cache.find(ch => ch.id === `${levelup.level_kanal}`);
			if(!channel){
				message.channel.send(mesaj)
			}else{
				channel.send(mesaj)
			}
		}
	}
	

	const PREFIX = server.prefix
	if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (input == client.commands) return message.channel.send('qwe');
    if (!input.length) return;
	
	const [,command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const commands = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!commands) return;
	if (server.kurulum == 0) return message.channel.send("Bu komutu kullanmak için Bruh Botunu kurmanız gerekmektedir! Kurulum için; !kurulum")
    try {
		commands.execute(message, args, commandArgs);
	} catch {
		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let seconds = date_ob.getSeconds();
		return console.log("\nHatalı Kullanım!\n"+ message.author.username, year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+"\
		\nKullandığı kullanım: "+ command);
	}

	
});

client.login(token)