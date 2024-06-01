const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "rankpuan",
    aliases: ["xppuan","xp"],
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
        if (!args[0] && isNaN(args[0])) return message.channel.send("Xp puanı belirlemelisin. (Sayı).")
        let sunucuargs = await servers.findOne({where: {sunucu_id: message.guild.id}})
        await sunucuargs.update({xp_puan: args[0]})
        return message.channel.send("Yeni puan değeri: "+args[0]) 
    }
}