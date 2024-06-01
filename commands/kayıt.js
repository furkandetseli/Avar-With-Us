const {Discord,servers,users,levels,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "kayıt",
    aliases: ["register"],
    async execute(message,args){
        let yetki = await yetkilers.findAll({where: {yetki_türü: "Mod",server_id: message.guild.id}}) || await yetkilers.findAll({where: {yetki_türü: "Yönetim",server_id: message.guild.id}})
        let sistem = 0 
        yetki.map(l => {
            if (message.member.roles.cache.some(role => role.id === `${l.rol_id}`)){
                sistem+=1
            }
        })
        if(sistem <= 0){
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return
            }
        }
        let user = message.mentions.members.first()
        if(!user){
            return
        }
        if(!isNaN(args[1])){
            return
        }
        let avatarList = ""
        let taggeduser= ""
        if(message.mentions.members.first()){
            avatarList = message.mentions.users.map(user => {return `${user.displayAvatarURL({format: "png", dynamic: true})}`});
            let taggeduserw = message.mentions.users.first();
            taggeduser = taggeduserw.username
        }else{
            avatarList = `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`
            taggeduser = message.author.username 
        }
        let isim = ""
        let cinsiyet = ""
        if(args[3] && !isNaN(args[3])){
            isim = `${args[1] +" "+args[2]}`
            await user.setNickname(`${isim}┆${args[3]}`)
            if(args[4] === "erkek" || args[4] === "Erkek"){
                const erkek = user.guild.roles.cache.find(role => role.id === `783626845798137876`);
		        await user.roles.add(erkek)
            }else if(args[4] === "kadın" || args[4] === "Kadın" || args[4] === "kız" || args[4] === "Kız"|| args[4] === "KIZ"|| args[4] === "KADIN"){
                const kadın = user.guild.roles.cache.find(role => role.id === `783626503027163136`);
		        await user.roles.add(kadın)
            }else{
                return message.reply("Geçersiz.")
            }
        }else{
            await user.setNickname(`${args[1]}┆${args[2]}`)
            if(args[3] === "erkek" || args[3] === "Erkek"){
                const erkek = user.guild.roles.cache.find(role => role.id === `783626845798137876`);
		        await user.roles.add(erkek)
            }else if(args[3] === "kadın" || args[3] === "Kadın"){
                const kadın = user.guild.roles.cache.find(role => role.id === `783626503027163136`);
		        await user.roles.add(kadın)
            }else{
                return message.reply("Geçersiz cinsiyet.")
            }
        }
        // await user.setNickname(`${args[1]}┆${args[2]}`)
		const role = user.guild.roles.cache.find(role => role.id === `766632572674768898`);
		await user.roles.add(role)
		const krole = user.guild.roles.cache.find(role => role.id === `783627153953914900`);
		await user.roles.remove(krole)
        let embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle("Kayıt tamam!")
            .setThumbnail(`${avatarList}`)
            .setDescription(`**Sunucumuza hoşgeldin**`)
        return message.channel.send(embed)
    }
}