const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "levelrole",
    aliases: ["rolekle"],
    async execute(message,args){
        let yetki = await yetkilers.findAll({where: {yetki_türü: "Yönetim",server_id: message.guild.id}})
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
        if(!args[0] && !args[1]){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !levelrole @üstad 10")
            return message.channel.send(embed)
        }
        if(!isNaN(args[0]) && isNaN(args[1])){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !levelrole @üstad 10 1")
            return message.channel.send(embed)
        }
        let rolw = message.mentions.roles.first()
        const role = message.guild.roles.cache.find(role => role.id === rolw.id);
        let levelq = Number(args[1])
        if(!role){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !levelrole @üstad 10 2")
            return message.channel.send(embed)
        }
        const level = await levels.findOne({where: {level: args[1]}})
        if(!level){
            const eskilevel = await levels.findOne({where: {level: (levelq-1)}})
            if(!eskilevel){
                let kat = (Number(((levelq-1)+1))/10)+1.5
                let üstlevel = Math.ceil(((levelq-1)+1)*100)*kat
                await levels.create({level: (levelq-1), üst: üstlevel})
            }
            const elevel = await levels.findOne({where: {level: (levelq-1)}})
		    let kat = (Number((levelq+1))/10)+1.5
		    let üstlevel = Math.ceil((levelq+1)*100)*kat
            await levels.create({level: levelq, taban: elevel.üst, üst: üstlevel})
        }
        const rolk = await rols.findOne({where: {level: args[1], server_id: message.guild.id}})
        if(!rolk){
            await rols.create({level: levelq, rol_id: role.id, server_id: message.guild.id})
            let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:white_check_mark: Başarı ile ${role} rolünü ${args[1]} seviyesine eklediniz.`)
            return message.channel.send(embed)
        }
        let embed = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setDescription("Zaten böyle bir level'ı eklemişsiniz.")
        return message.channel.send(embed)
    }
}