const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "mesajayar",
    aliases: ["messageset"],
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
                .setDescription("❗Hatalı kullanım! Örnek; !mesajayar giren <server> sunucsuna hoşgeldin <user>!")
            return message.channel.send(embed)
        }
        let mesaj = args.slice(0).join(' ');
        mesaj = mesaj.slice(Number(args[0].length))
        if(!mesaj){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Hatalı kullanım! Örnek; !mesajayar giren <server> sunucsuna hoşgeldin <user>!")
            return message.channel.send(embed)
        }
        if(mesaj.length <= 2) return message.channel.send("Mesajın çok kısa.")
        if(args[0].toLowerCase() == "giren"){
            const sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            sunucu.update({hoşgeldin: 1, hoşgeldin_mesaj: mesaj})
            const embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setDescription(`\*\*Giren kişi mesajı ayarlandı! Mesaj;\*\*\n\n**${mesaj}**`)
            message.channel.send(embed)
        }
        if(args[0].toLowerCase() == "çıkan" || args[0].toLowerCase() == "cıkan"){
            const sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            sunucu.update({exit: 1, exit_mesaj: mesaj})
            const embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setDescription(`\*\*Çıkış mesajı ayarlandı! Mesaj;\*\*\n\n**${mesaj}**`)
            message.channel.send(embed)
        }
        if(args[0].toLowerCase() == "level"){
            const sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            sunucu.update({level: 1, level_mesaj: mesaj})
            const embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setDescription(`\*\*Seviye atlama mesajı ayarlandı! Mesaj;\*\*\n\n**${mesaj}**`)
            message.channel.send(embed)
        }
    }
}