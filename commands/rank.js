const {Discord,servers,users,levels,yetkilers} = require('./objeler');
const dl = require('./objeler');
const canvacord = require("canvacord");
const Canvas = require("discord-canvas")

module.exports = {
    name: "rank",
    aliases: ["seviye","rütbe","level","rutbe"],
    async execute(message,args){
        let user = message.mentions.members.first() || message.author;
        
        let avatarList = ""
        let taggeduser= ""
        let kod = ""
        if(message.mentions.members.first()){
            avatarList = message.mentions.users.map(user => {return `${user.displayAvatarURL({format: "png", dynamic: true})}`});
            let taggeduserw = message.mentions.users.first();
            taggeduser = taggeduserw.username
            kod = taggeduserw.discriminator
        }else{
            avatarList = `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`
            taggeduser = message.author.username
            kod = message.author.discriminator
        }
        const kişi = await users.findOne({where: {user_id: user.id, server: message.guild.id}})
        let net = kişi.xp
        const klasik = await levels.findOne({where: {level: kişi.level}})
        let üst = Math.ceil(klasik.üst)
        let alt = Math.ceil(klasik.taban)
        let yüzde = Math.ceil(((net-alt)/(üst-alt))*100) 
        let syüzde = Math.round((((net-alt)/(üst-alt))*100)/2)
        let toplam = 50
        let nokta = ""
        for(a = 1; a < syüzde; a++) {
            nokta += "❘"
        }
        for(a = 1; a < toplam-syüzde; a++) {
            nokta += " "
        }
        const stored = await users.findAll({where: {server: message.guild.id}});
        stored.sort((a, b) => b.xp - a.xp)
        var kişiselsıra = []
        stored.map(l =>{
            kişiselsıra.push(l.user_id)
        })
        let sıra = kişiselsıra.indexOf(`${user.id}`)
        const rank = new canvacord.Rank()
            .setAvatar(`${avatarList}`)
            .setCurrentXP(net-alt)
            .setRequiredXP(üst-alt)
            .setStatus(`online`)
            .setRank(sıra+1)
            .setBackground("IMAGE","https://wallpapercave.com/wp/wp3348587.jpg")
            // .setBackground("IMAGE","https://i2.milimaj.com/i/milliyet/75/1200x675/5f02f0d3adcdeb0c14250a0b.jpg")
            .setLevel(kişi.level)
            .setProgressBar("#90EE90", "COLOR")
            .setUsername(`${taggeduser}`)
            .setDiscriminator(`${kod}`);
        
        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                return message.channel.send(attachment);
            }).catch();
        
        // let embed = new Discord.MessageEmbed()
        //     .setColor(`${dl.renk}`)
        //     .setThumbnail(`${avatarList}`)
        //     .setTitle(`${taggeduser} Level Tablosu`)
        //     .addFields(
        //         { name: `| ${nokta} | _%${yüzde}_`, value: `**Seviye: ${kişi.level}** ----- ${alt} / **${net}** / ${üst}` },
        //     )
        //     .setFooter(`${dl.botname}`,`${dl.profil}`)
        // return message.channel.send(embed)
        
    }
}

