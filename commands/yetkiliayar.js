const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "yetkiliayar",
    async execute(message,args){
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return
        }
        let rol = message.mentions.roles.first()
        var yetkiler = ["yönetim","mod","ban"]
        if(!args[0] || !args[1] || !rol || !isNaN(args[1])) {
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("**Örnek; !yetkiliayar Yönetim @yönetimrolü**\n\n_Kullanabileceğiniz Terimler: Yönetim, Mod, Ban_")
            return message.channel.send(embed)
        }
        if(yetkiler.indexOf(args[0].toLowerCase()) <= -1){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("**Örnek; !yetkiliayar Yönetim @yönetimrolü**\n\n_Kullanabileceğiniz Terimler: Yönetim, Mod, Ban_")
            return message.channel.send(embed)
        }
        let argsw = args[0].replace(/^\w/, function($0){return $0.toUpperCase();})
        let yetkiw = await yetkilers.findOne({where: {rol_id: `${rol.id}`, yetki_türü: `${argsw}`, server_id: `${message.guild.id}`}})
        if(yetkiw){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("Böyle bir rol zaten bulunmakta!")
            return message.channel.send(embed) 
        }
        await yetkilers.create({rol_id: `${rol.id}`, yetki_türü: `${argsw}`, server_id: `${message.guild.id}`})
        let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("**Başarılı!**")
                .setDescription(`${rol} rolü ${argsw} rolüne yetkilendirildi!`)
            return message.channel.send(embed) 



        
    }
}