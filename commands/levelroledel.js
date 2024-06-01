const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "levelroledel",
    aliases: ["rolsil"],
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
        if(!args[0]){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !levelroledel @rol")
            return message.channel.send(embed)
        }
        if(!isNaN(args[0])){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !levelroledel @rol")
            return message.channel.send(embed)
        }
        let rolw = message.mentions.roles.first()
        if(!rolw){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !levelroledel @rol")
            return message.channel.send(embed)
        }
        const role = message.guild.roles.cache.find(role => role.id === rolw.id);
        if(!role){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !levelroledel @rol")
            return message.channel.send(embed)
        }
        const rolk = await rols.findOne({where: {rol_id: rolw.id, server_id: message.guild.id}})
        if(!rolk){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Böyle bir rol bulunmamakta!`)
            return message.channel.send(embed)
        }
        if(args[1] && !isNaN(args[1])){
            let levelq = Number(args[1])
            await rols.destroy({where: {level: levelq, rol_id: rolw.id, server_id: message.guild.id}})
            let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:white_check_mark: Başarı ile ${args[1]} seviyesindeki ${role} rolü silindi!`)
            return message.channel.send(embed)
        }
        await rols.destroy({where: {rol_id: rolw.id, server_id: message.guild.id}})
        let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`:white_check_mark: Başarı ile ${role} rolü silindi!`)
            return message.channel.send(embed)
    }
}