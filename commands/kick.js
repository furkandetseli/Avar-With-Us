const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "kick",
    async execute(message, args){
        let yetki = await yetkilers.findAll({where: {yetki_türü: "Ban",server_id: message.guild.id}}) || await yetkilers.findAll({where: {yetki_türü: "Yönetim",server_id: message.guild.id}})
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
        
        const user = message.mentions.users.first();
        if(!user){
          let embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription("❗Hatalı kullanım! Örnek; !kick <user>")
          return message.channel.send(embed)
        }
        if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Ban atmak istediğin kişi senden rol olarak daha üstün");

        if (user) {
          const member = message.guild.member(user);
          if (member) {
            member
              .kick('Optional reason that will display in the audit logs')
              .then(() => {
                message.reply(`Banlandı: ${user.tag}`);
            })
            }
        }
    }
}