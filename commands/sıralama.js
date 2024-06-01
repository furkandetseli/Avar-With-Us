const {Discord,servers,users,levels,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "sıralama",
    async execute(message,args){
        let server = await servers.findOne({where: {sunucu_id: message.guild.id}})
        const stored = await users.findAll({where: {server: message.guild.id}});
        stored.sort((a, b) => b.xp - a.xp)
        var kişiselsıra = []
        stored.map(l =>{
            kişiselsıra.push(l.user_id)
        })
        let sıra = kişiselsıra.indexOf(`${message.author.id}`)
        let embed = new Discord.MessageEmbed()
            .setColor(`${dl.renk}`)
            .setTitle(`${server.sunucu_adı} Sunucusunun Level Sıralaması;`)
            .setThumbnail(`${dl.profil}`)
            .setDescription(stored.slice(0,15).map((l,pozisyon) =>`**${pozisyon+=1}-** <@${l.user_id}> ==> ${l.level} LVL / _${l.xp} XP_`).join('\n\n'), { code: true })
            .setFooter(`${message.author.username}, liste de sıralaman ${sıra+1}`,`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`)
        return message.channel.send(embed)
    }
}
