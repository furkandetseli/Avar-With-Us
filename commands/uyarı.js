const {Discord,servers,users,levels,rols,uyarılar,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "uyarı",
    aliases: ["warning","warn"],
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
        if(!args[0] && !args[1]){
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("❗Hatalı kullanım! Örnek; !uyarı @kullanıcı Boş yere spam atmak.")
            return message.channel.send(embed)
        }
        let ars = Number(args[0].length)
        let mesaj = args.slice(0).join(' ');
        mesaj = mesaj.slice(ars)
        if(mesaj.length <= 1){
            mesaj = "Belirtilmemiş bir neden"
        }
        let user = message.mentions.members.first()
        if(!user){
            let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("❗Hatalı kullanım! Örnek; !uyarı @kullanıcı Boş yere spam atmak.")
            return message.channel.send(embed)
        }
        if (user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Uyarı atmak istediğin kişi senden rol olarak daha üstün");

        let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = date_ob.getHours();
		let minutes = date_ob.getMinutes();
		let seconds = date_ob.getSeconds();
		let tarihs = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
        const sunucu = await servers.findOne({where: {sunucu_id: message.guild.id}})
        const uyarı = await uyarılar.findAll({where: {user_id: user.id, server_id: message.guild.id}})
        let sayı = uyarı.length
        if(!uyarı || sayı == 0){
            sayı = 1
            await uyarılar.create({user_id: user.id, uyarı_no: 1, uyarı_neden: mesaj, tarih: tarihs, uyaran_yetkili: message.author.id, server_id: message.guild.id })
            const embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setTitle(`Kullanıcı Uyarıldı!`)
                .setDescription(`***${user}**, Yetkili: **${message.author}** tarafından **${mesaj}** nedeniyle uyarıldı!\nKullanıcıya ait toplam uyarı: ${sayı}*`)
            return message.channel.send(embed)
        }
        await uyarılar.create({user_id: user.id, uyarı_no: (sayı+1), uyarı_neden: mesaj, tarih: tarihs, uyaran_yetkili: message.author.id, server_id: message.guild.id })
        const embed = new Discord.MessageEmbed()
            .setColor(`${dl.renk}`)
            .setTitle(`Kullanıcı Uyarıldı!`)
            .setDescription(`***${user}**, Yetkili: **${message.author}** tarafından **${mesaj}** nedeniyle uyarıldı!\nKullanıcıya ait toplam uyarı: ${sayı+1}*`)
        message.channel.send(embed)
        if((sayı+1) >= sunucu.uyarı_limit){
            let users = message.mentions.members.first()
            let uyarık = await uyarılar.findAll({where: {user_id: users.id, server_id: message.guild.id}})
            await uyarık.destroy()
            const member = message.guild.member(user);
            if(member){
                member
                    .kick(mesaj)
                    .then(() => {
                    message.reply(`Kicklendi: ${user}`);
                })
            }
            
        }
        } catch{

        } finally{
            let yetki = await yetkilers.findAll({where: {yetki_türü: "Mod",server_id: message.guild.id}})
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
                return
            }
            if (user.roles.highest.position >= message.member.roles.highest.position) return;

            let ars = 0
            if(!Number(args[0].length)){
                ars = 0
            }else{
                ars = Number(args[0].length)
            }
            
            let mesaj = args.slice(0).join(' ');
            mesaj = mesaj.slice(ars)
            if(mesaj.length <= 1){
                mesaj = "Belirtilmemiş bir neden"
            }
            const uyarı = await uyarılar.findAll({where: {user_id: user.id, server_id: message.guild.id}})
            let sayı = uyarı.length
            const embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setTitle(`Uyarıldın!`)
                .setDescription(`***${user}**, Yetkili: **${message.author}** tarafından **${mesaj}** nedeniyle uyarıldın!\n**${message.guild.name}** sunucusunda ait toplam uyarın: ${sayı}*`)
            user.send(embed)
        }
    }
}