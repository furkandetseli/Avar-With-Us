const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');



module.exports = {
    name: "kanalayar",
    aliases: ["setchannel","channelsettings"],
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
        var liste = ["giren","level","çıkan"]
        if(!args[0] || !args[1]){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("**Örnek; !kanalayar giren/çıkan/level #kanal**\n\n_Kullanabileceğiniz Terimler: Giren, Çıkan, Level_")
            return message.channel.send(embed)
        }
        if(liste.indexOf(args[0].toLowerCase()) <= -1){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("**Örnek; !kanalayar giren/çıkan/level #kanal**\n\n_Kullanabileceğiniz Terimler: Giren, Çıkan, Level_")
            return message.channel.send(embed) 
        }
        let alan = args[0]
        let mention = args[1]
        if (mention.startsWith('<#') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
        }else{
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("**Örnek; !kanalayar giren/çıkan/level #kanal**\n\n_Kullanabileceğiniz Terimler: Giren, Çıkan, Level_")
            return message.channel.send(embed)
        }
        if(args[0].toLowerCase() == "çıkan" || args[0].toLowerCase() == "Çıkan"){
            alan == "Çıkan"
            const sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            sunucu.update({exit: 1, exit_kanal: mention})
        }
        if(args[0].toLowerCase() == "level" || args[0].toLowerCase() == "Level"){
            alan == "Level"
            const sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            sunucu.update({level: 1, level_kanal: mention})
        }
        if(args[0].toLowerCase() == "giren" || args[0].toLowerCase() == "Giren"){
            alan == "Giren"
            const sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            sunucu.update({hoşgeldin: 1, hoşgeldin_kanal: mention})
        }
        const embed = new Discord.MessageEmbed()
            .setColor(`${dl.renk}`)
            .setDescription(`**${alan} kanalı ayarlandı! Kanal;**\n\n<#${mention}>`)
        message.channel.send(embed)
    }
}