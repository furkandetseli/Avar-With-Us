const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "sunucubilgi",
    aliases: ["si","panel","sunucubilgisi"],
    usage: "sunucubilgi",
    description: "Sunucu bilgi.",
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
        let yönetims = await yetkilers.findAll({where: {yetki_türü: "Yönetim",server_id: message.guild.id}})
        let yetkili = await yetkilers.findAll({where: {yetki_türü: "Mod",server_id: message.guild.id}})
        let ban = await yetkilers.findAll({where: {yetki_türü: "Ban",server_id: message.guild.id}})

        const embed = new Discord.MessageEmbed().setTimestamp().setColor(dl.renk).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setFooter(`${dl.botname}`)
        .setThumbnail(dl.profil)
        .setDescription(`**Toplam Üye:** ${message.guild.memberCount}\
        \n**Aktif Üye:** __${await message.guild.members.cache.filter(u => u.presence.status != "offline").size}__ :green_circle:\
        \n**Yönetim Rolleri:** ${yönetims.map(l => `<@&${l.rol_id}>`).join(" ")}\
        \n**Yetkili Rolleri:** ${yetkili.map(l => `<@&${l.rol_id}>`).join(" ")}\
        \n**Ban&Kick Yetki Rolleri:** ${ban.map(l => `<@&${l.rol_id}>`).join(" ")}\n\
        \n**Kanallar & Kategoriler:** ${message.guild.channels.cache.size} (${message.guild.channels.cache.filter(c => c.type === "text").size} yazı,\
         ${message.guild.channels.cache.filter(c => c.type === "voice").size} sesli,\
         ${message.guild.channels.cache.size - (message.guild.channels.cache.filter(c => c.type === "text").size +message.guild.channels.cache.filter(c => c.type === "voice").size)} kategori)\
         \n**Roller:** ${message.guild.roles.cache.size}\n**Oluşturulma Tarihi:** ${message.guild.createdAt}`);
        message.channel.send(embed);
    }
};
