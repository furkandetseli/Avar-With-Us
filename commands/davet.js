const {Discord,servers,users,levels,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "davet",
    aliases: ["invite"],
    async execute(message,args){
        return
        let embed = new Discord.MessageEmbed()
            .setColor(`${dl.renk}`)
            .setTitle("Buraya Basarak Davet Et!")
            .setThumbnail(`${dl.profil}`)
            .setURL("https://discord.com/oauth2/authorize?client_id=763511621469339678&scope=bot","Buraya Basarak Davet Et!")
            .setDescription(`**Davet Atılan Sunucu: ${message.guild.name}**\n\n**Bizi tercih ettiğin için teşekkürler. Süpersin!**\n\n__Link İstersen;__ https://discord.com/oauth2/authorize?client_id=763511621469339678&scope=bot`)
        return message.author.send(embed)
    }
}