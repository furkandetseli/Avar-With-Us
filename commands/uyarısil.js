const {Discord,servers,users,levels,rols,uyarılar,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "uyarısil",
    aliases: ["wardel"],
    async execute(message,args){
        try{
            let yetki = await yetkilers.findAll({where: {yetki_türü: "Mod",server_id: message.guild.id}}) || await yetkilers.findAll({where: {yetki_türü: "Yönetim",server_id: message.guild.id}})
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
        let user = message.mentions.members.first()
        if(!user){
            return message.channel.send("Lütfen bir kullanıcıyı etiketleyiniz!")
        }
        let uyarılars = await uyarılar.findAll({where: {server_id: message.guild.id, user_id: user.id}})
        if(!uyarılars){
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`***${user}** adlı üyenin sicili temiz.*`)
            return message.channel.send(embed)
        }
        var liste = []
        await uyarılars.sort((a, b) => b.xp - a.xp)
        uyarılars.map(l => {
            liste.push(l.uyarı_no)
        })
        liste.sort((a,b)=>b-a)
        let son = liste[0]
        await uyarılar.destroy({where: {server_id: message.guild.id, user_id: user.id, uyarı_no: son}})
        const embed = new Discord.MessageEmbed()
            .setColor(`${dl.renk}`)
            .setTitle(`Kullanıcı'nın uyarısı silindi!`)
            .setDescription(`Kullanıcının kalan uyarı sayısı: ${liste.length-1}`)
            .setFooter(`Toplam Uyarı:`,`${dl.profil}`)
        message.channel.send(embed)

        } catch{
        }
    }
}