const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');


module.exports = {
    name: `temizle`,
    aliases: ["prune","sil"],
    description: `Mesaj siler.`,
    async execute(message,args) {
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
        const silinecek = parseInt(args[0]) + 1;
        const gözüksün = parseInt(silinecek) - 1;
        if(args[0] < 1 || args[0] > 100){
            message.channel.send(`Belirttiğin sayı 1 ile 100 arası olmalı.`);
            return;
        };
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            message.reply(`Mesaj silmek için yeterli yetkin yok.`);
            return;
        };
        if(isNaN(silinecek)){
            message.channel.send(`Silinecek mesaj miktarını belirtmelisin.`);
            return;
        };
        message.channel.bulkDelete(silinecek, true)
        message.reply(`${gözüksün} adet mesaj silindi.`)
            .then(sentMessage => sentMessage.delete({ timeout: 10000 }))
    },
};