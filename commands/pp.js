const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "pp",
    aliases: ["profil","avatar"],
    async execute(message,args){
        let user = message.mentions.members.first() || message.author;
        let avatarList = ""
        let taggeduser= ""
        if(message.mentions.members.first()){
            avatarList = message.mentions.users.map(user => {return `${user.displayAvatarURL({format: "png", dynamic: true})}`});
            let taggeduserw = message.mentions.users.first();
            taggeduser = taggeduserw.username
        }else{
            avatarList = `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`
            taggeduser = message.author.username 
        }
        const agab = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${taggeduser} Kişisinin Profil Fotoğrafı`)
            .setImage(`${avatarList}`)
        message.channel.send(agab) 
    }
}