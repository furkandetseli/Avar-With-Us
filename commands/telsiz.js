const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "destek",
    async execute(message,args){
        let channels = message.guild.channels.cache.find(channel => channel.id === `777622721118732288`)
        let kişi = message.author
        let bot = "746094319576023141"
        if(!channels) return message.channel.send("Telsiz kanalını bulamıyorum.")
        let mesaj = args.slice(0).join(' ');
        if(!mesaj) return message.channel.send("Destek talep mesajını yazmalısın!")
        const embed = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .setTitle(`:radio: Avar With Us | Destek Talebi`)
            .setThumbnail("https://eigp.es/wp-content/uploads/2017/05/Megafono.gif")
            .setDescription(`:loudspeaker: ** Destek Talebi var;**\n\n*${mesaj}*\n\n***Kanal:** <#${message.channel.id}>*\n***Destek İsteyen:** <@${message.author.id}>*`)
        message.channel.send(`Destek, başarıyla adminlere gönderildi!`)
            let aga = await channels.send(`<@&777636317814718474>`)
        .then(async function (messages) {
            await channels.send(embed)
            .then(async function (message) {
                message.react('✅')
                const filter = (reaction, user) => {
                    return ['✅'].includes(reaction.emoji.name) && user.id !== bot;
                };
                await message.awaitReactions(filter, { max: 1, time: 2520000, errors: ['time'] })
                    .then(async collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '✅') {
                            messages.edit(`✅ Destekle ilgilenildi!`)            
                        }
                    })
                    .catch(async collected => {
                        messages.edit("💔 Destekle ilgilenilmedi!")
                    });
            }).catch(function() {
        //Something
            })
        })
        
        if (message.channel == channels){
            return
        }


    }
}