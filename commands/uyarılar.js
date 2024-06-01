const {Discord,servers,users,levels,rols,uyarılar,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "uyarılar",
    aliases: ["warning","warn"],
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
                let sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            let uyarı = await uyarılar.findAll({where: {user_id: message.author.id, server_id: message.guild.id}})
            let sayı = uyarı.length
            if(!uyarı || sayı == 0){
                const embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`***${message.author}** adlı üyenin sicili temiz.*`)
                return message.channel.send(embed)
            }
            const embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setTitle(`Kullanıcı Uyarıldı!`)
                .setDescription(uyarı.map(l => `*<@${l.uyaran_yetkili}> tarafından **${l.uyarı_neden}** nedeniyle **${l.tarih}** tarihinde uyarıldı!*`).join('\n\n'), { code: true })
                .setFooter(`Toplam Uyarı: ${uyarı.length}`,`${dl.profil}`)
                return message.channel.send(embed)
            }
        }
        let user = message.mentions.members.first()
        if(!user){
            let sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
            let uyarı = await uyarılar.findAll({where: {user_id: message.author.id, server_id: message.guild.id}})
            let sayı = uyarı.length
            if(!uyarı || sayı == 0){
                const embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`***${message.author}** adlı üyenin sicili temiz.*`)
                return message.channel.send(embed)
            }
            const embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setTitle(`Kullanıcı Uyarıldı!`)
                .setDescription(uyarı.map(l => `*<@${l.uyaran_yetkili}> tarafından **${l.uyarı_neden}** nedeniyle **${l.tarih}** tarihinde uyarıldı!*`).join('\n\n'), { code: true })
                .setFooter(`Toplam Uyarı: ${uyarı.length}`,`${dl.profil}`)
            return message.channel.send(embed)
        }
        if(!args[0]){
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("❗Hatalı kullanım! Örnek; !uyarılar @kullanıcı")
            return message.channel.send(embed)
        }
        let ars = Number(args[0].length)
        let mesaj = args.slice(0).join(' ');
        mesaj = mesaj.slice(ars)

        let sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
        let uyarı = await uyarılar.findAll({where: {user_id: user.id, server_id: message.guild.id}})
        let sayı = uyarı.length
        if(!uyarı || sayı == 0){
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`***${user}** adlı üyenin sicili temiz.*`)
            return message.channel.send(embed)
        }
        const embed = new Discord.MessageEmbed()
            .setColor(`${dl.renk}`)
            .setTitle(`Kullanıcı Uyarıldı!`)
            .setDescription(uyarı.map(l => `*<@${l.uyaran_yetkili}> tarafından **${l.uyarı_neden}** nedeniyle **${l.tarih}** tarihinde uyarıldı!*`).join('\n\n'), { code: true })
            .setFooter(`Toplam Uyarı: ${uyarı.length}`,`${dl.profil}`)
        message.channel.send(embed)
    }
}