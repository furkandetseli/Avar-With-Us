const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "yetkilisil",
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
                .setDescription("**Örnek; !yetkilisil Yönetim @yönetimrolü**\n\n_Kullanabileceğiniz Terimler: Yönetim, Mod, Ban_")
            return message.channel.send(embed)
        }
        if(yetkiler.indexOf(args[0].toLowerCase()) <= -1){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("**Örnek; !yetkilisil Yönetim @yönetimrolü**\n\n_Kullanabileceğiniz Terimler: Yönetim, Mod, Ba1n_")
            return message.channel.send(embed)
        }
        let argsw = args[0].replace(/^\w/, function($0){return $0.toUpperCase();})
        let yetkiw = await yetkilers.findOne({where: {rol_id: `${rol.id}`, yetki_türü: `${argsw}`, server_id: `${message.guild.id}`}})
        if(!yetkiw){
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("**❗Hatalı kullanım!**")
                .setDescription("Böyle bir rol zaten yok!")
            return message.channel.send(embed) 
        }else{
            await yetkilers.destroy({where: {rol_id: `${rol.id}`, yetki_türü: `${argsw}`, server_id: `${message.guild.id}`}})
            let embed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("**Başarılı!**")
                .setDescription(`${rol} rolü ${argsw} rolünden kaldırıldı!`)
            return message.channel.send(embed) 
        }



        
    }
}