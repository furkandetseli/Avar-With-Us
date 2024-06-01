const {Discord,servers,users,yetkilers} = require('./objeler');
const dl = require('./objeler');


module.exports = {
    name: "help",
    aliases: ["yardım","yardim"],
    async execute(message,args){
        if(!args[0]){
            let sw = await servers.findOne({where: {sunucu_id: message.guild.id }})
            let embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setThumbnail(`${dl.profil}`)
                .setTitle(`${dl.botname} Komutları`)
                .setDescription(`\`\`Yönetim\`\` **->** ${sw.prefix}help yönetim\n\
                \`\`Moderasyon\`\` **->** ${sw.prefix}help moderasyon\n\
                \`\`Komutlar\`\` **->** ${sw.prefix}help komutlar`)
            return message.channel.send(embed)
        }
        if(args[0].toLowerCase() == "yönetim"){
            let yetki = await yetkilers.findAll({where: {yetki_türü: "Yönetim",server_id: message.guild.id}})
            let sistem = 0 
            yetki.map(l => {
                if (message.member.roles.cache.some(role => role.id === `${l.rol_id}`)){
                    sistem+=1
                }
            })
            if(sistem <= 0){
                if (!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("Yönetici olmadığınız için bu yardım sekmesini kullanamazsınız!")
                }
            }
            let sw = await servers.findOne({where: {sunucu_id: message.guild.id }})
            let embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setThumbnail(`${dl.profil}`)
                .setTitle(`${dl.botname} Yönetim Komutları`)
                .setDescription(`\
                \`\`${sw.prefix}sunucubilgi\`\`\nSunucunun genel durumunu ve yetkili rolleri gösterir.\n\n\
                \`\`${sw.prefix}kanalayar <tür> #<kanal>\`\`\nGiren-Çıkan veya Seviye atlayan kişilere atılacak mesajların kanalını ayarlar.\n\n\
                \`\`${sw.prefix}mesajayar <tür> <mesaj>\`\`\nGiren-Çıkan veya Seviye atlayan kişilere atılacak mesajları ayarlar.\n\n\
                \`\`${sw.prefix}allrole\`\`\nSeviye artışı alınan rollerin listesi.\n\n\
                \`\`${sw.prefix}levelrole @<rol> <seviye no>\`\`\nSeviye artışı alınan rolleri ayarlar.\n\n\
                \`\`${sw.prefix}levelroledel @<rol> <seviye no>\`\`\nSeviye artışı alınmaya ayarlanan rolü siler.\n\n\
                \`\`${sw.prefix}rankpuan <sayı>\`\`\nMesaj başı verilen puanı ayarlar.\n\n\
                \`\`${sw.prefix}setprefix <yeniprefixdeğeri>\`\`\nBotun prefix değerini değiştirir.\n\n\
                \`\`${sw.prefix}yetkiliayar <yönetim-türü> @<rol>\`\`\nYetkilileri ayarlamaya yarar.\n\n\
                \`\`${sw.prefix}yetkilisil <yönetim-türü> @<rol>\`\`\nAyarlanmış yetkili rolünü siler.\n\n\
                \`\`${sw.prefix}uyarılimit <sayı>\`\`\nOyuncuların kaç uyarıdan sonra kick yiyeceğini ayarlar.\n\n\
                `)
            return message.channel.send(embed)

        }
        if(args[0].toLowerCase() == "moderasyon"){
            let yetki = await yetkilers.findAll({where: {yetki_türü: "Mod",server_id: message.guild.id}})
            let sistem = 0 
            yetki.map(l => {
                if (message.member.roles.cache.some(role => role.id === `${l.rol_id}`)){
                    sistem+=1
                }
            })
            if(sistem <= 0){
                if (!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("Moderasyon rollerinden birine sahip olmadığınız için bu yardım sekmesini kullanamazsınız!")
                }
            }
            let sw = await servers.findOne({where: {sunucu_id: message.guild.id }})
            let embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setThumbnail(`${dl.profil}`)
                .setTitle(`${dl.botname} Moderasyon Komutları`)
                .setDescription(`\
                \`\`${sw.prefix}uyarı @<kullanıcı> <uyarı-nedeni>\`\`\nOyuncuları uyarmak için kullanılır.\n\n\
                \`\`${sw.prefix}uyarılar @<kullanıcı>\`\`\nSeçilen oyuncunun yediği uyarıların nedenini ve uyarı tarihlerini listeler.\n\n\
                \`\`${sw.prefix}temizle <sayı>\`\`\nMesajları temizler, tek seferde 99 tane temzileyebilir.\n\n\
                \`\`${sw.prefix}ban @<kullanıcı>\`\`\nBan rolü yetkisine sahip olanlar ban atabilir.\n\n\
                \`\`${sw.prefix}kick @<kullanıcı>\`\`\nBan rolü yetkisine sahip olanlar kick atabilir.\n\n\
                `)
            return message.channel.send(embed)

        }
        if(args[0].toLowerCase() == "komutlar"){
            let sw = await servers.findOne({where: {sunucu_id: message.guild.id }})
            let embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setThumbnail(`${dl.profil}`)
                .setTitle(`${dl.botname} Komutları`)
                .setDescription(`\
                \`\`${sw.prefix}rank\`\`\nPuan durumunuzu gösterir.\n\n\
                \`\`${sw.prefix}sıralama\`\`\nEn çok puanı olan ilk 10 oyuncuyu gösterir.\n\n\
                `)
            return message.channel.send(embed)

        }else{
            let sw = await servers.findOne({where: {sunucu_id: message.guild.id }})
            let embed = new Discord.MessageEmbed()
                .setColor(`${dl.renk}`)
                .setThumbnail(`${dl.profil}`)
                .setTitle(`${dl.botname} Komutları`)
                .setDescription(`\`\`Yönetim\`\` **->** ${sw.prefix}help yönetim\n\
                \`\`Moderasyon\`\` **->** ${sw.prefix}help moderasyon\n\
                \`\`Komutlar\`\` **->** ${sw.prefix}help komutlar`)
            return message.channel.send(embed)
        }
    }
}