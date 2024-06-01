const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "allrole",
    aliases: ["roller"],
    async execute(message,args){        
        try{
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
            // if (!message.member.roles.cache.some(role => role.id === `${ownerrole}`)) return 
            let level = await rols.findAll({where: {server_id: message.guild.id}})
            if(!level){
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("❗Bura boş gözüküyor.")
                return message.channel.send(embed)
            }
            let server = await servers.findOne({where: {sunucu_id: message.guild.id}})
            let embed = new Discord.MessageEmbed()
                    .setColor(`${dl.renk}`)
                    .setTitle(`${server.sunucu_adı} Sunucusunun Seviye Rolleri;`)
                    .setThumbnail(`${dl.profil}`)
                    .setDescription(level.map(l => `Rol: <@&${l.rol_id}> ==> Verildiği Seviye: ${l.level}`).join('\n\n'), { code: true })
            return message.channel.send(embed)
        }catch{
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("❗Bura boş gözüküyor.")
            return message.channel.send(embed)
        }
    }
}