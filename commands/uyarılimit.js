const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "uyarılimit",
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
        if (!args[0] && isNaN(args[0])) return message.channel.send("Uyarı limiti belirlemelisin. (Sayı).")
        let sunucuargs = await servers.findOne({where: {sunucu_id: message.guild.id}})
        await sunucuargs.update({uyarı_limit: args[0]})
        return message.channel.send("Yeni uyarı limit değeri: "+args[0]) 
    }
}