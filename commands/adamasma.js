const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: "adamasmaca",
    async execute(message,args){
        
        this.games = new Set();
        if(this.games.has(message.channel.id)) await message.reply('Kanal başına sadece bir düello meydana gelebilir.');
        const islem = Math.floor(Math.random() * (100 - 1)) + 1
        const fixedlisonuç = islem
        let choice;
        let haklar = 0
        await message.react('🚀')
        let onay = false
        let user = message.mentions.members.first()
        if(!user){
            return message.channel.send("Birini etiketlemelisin.")
        }
        const hadibaqims = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(stripIndents`**💫 |${user}, adam asmaca telifi aldınız kabul etmek için \`evet\` veya \`hayır\` olarak cevap veriniz.**`)
        await message.channel.send(hadibaqims)
        while (!onay) {
            const response = await message.channel.awaitMessages(neblm => neblm.author.id === user.id, { max: 1, time: 150000 });
            if(!response.first()) { 
                this.games.delete(message.channel.id);
                const agab = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`**⌛ | ${user}, Zaman Doldu**`)
                message.channel.send(agab)
            }
            let cevap = response.first().content
            cevap = cevap.toUpperCase()
            if(cevap == "EVET" || cevap == "EVT"){
                message.channel.send("Adam asmaca isteği kabul edildi!")
                onay = true
                continue
            }
            if(cevap == "HAYIR" || cevap == "HYR"){
                message.channel.send("Adam asmaca isteği kabul edilmedi!")
                return
            }
        }
        this.games.add(message.channel.id);
        const hadibaqim = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(stripIndents`**💫 |${message.author}, lütfen DM kutunuzu kontrol ediniz. **`)
        await message.channel.send(hadibaqim)
        // Özel mesaj başlangıcı
        let yanlıs = 3
        let beklenen = 2
        let konsept = ""
        let cevaps = ""
        let gizli = ""
        if(user){
            const hadibaqim = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(stripIndents`**💫 | ${message.author},${user} ile adam asmaca oyununa başladınız, ilk başta sorunuzun konspetini yazınız sonra da sorunuzu yazınız. **`)
            await message.author.send(hadibaqim)
            // dizi&film sorucu
            let cevap;            
            let soru = false;
            while(beklenen != 0){
                const response = await message.author.dmChannel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 150000 });
                if(!response.first()) { 
                    this.games.delete(message.channel.id);
                    const agab = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`**⌛ | ${message.author}, Zaman Doldu**`)
                    message.author.send(agab)
                }
                const cevap = response.first().content
                if(beklenen == 2){
                    if(cevap.length <= 1){
                        const agab = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription(`**⌛ | ${message.author}, Geçersiz konsept**`)
                        message.author.send(agab) 
                    }else{
                        konsept = cevap.toUpperCase()
                        const agab = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription(`**⌛ | ${konsept} konsepti seçildi! Sorunuzu yazınız.**`)
                        message.author.send(agab) 
                        beklenen -= 1
                        continue
                    }
                }
                if(beklenen == 1){
                    if(cevap.length <= 2){
                        const agab = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription(`**⌛ | ${message.author}, Geçersiz soru**`)
                        message.author.send(agab) 
                    }else{
                        cevaps = cevap.toUpperCase()
                        const agab = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription(`**⌛ | ${cevaps} sorusu seçildi! <#${message.channel.id}> kanalında sormaya başladım.**`)
                        message.author.send(agab) 
                        beklenen -= 1
                        continue
                    }
                }

            }
            let uwu = false;
            let bilemedi = false
            let bulunmayanlar = []
            let bulunanlar = []
            const alfabe = ["1","2","3","4","5","6","7","8","9","0","A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "İ", "I", "J", "K", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"]
            const hangmanPictures = [
                'https://imgur.com/Ad5vgPD.png',
                'https://imgur.com/jxPXvDP.png',
                'https://imgur.com/M6rbN9m.png',
                'https://imgur.com/KFEHYJG.png',
                'https://imgur.com/fcEsw9A.png',
                'https://imgur.com/S3bBIhl.png',
                'https://imgur.com/gwS4ohM.png',
                'https://imgur.com/RZQCq21.png',
                'https://imgur.com/Py8zHOx.png',
                'https://imgur.com/ikOBjSm.png',
                'https://imgur.com/jSlG4cf.png',
                'https://imgur.com/wsxb7Uq.png',
                'https://imgur.com/bVsUfP3.png',
                'https://imgur.com/Mwzwp6i.png',
                'https://imgur.com/qltUWtL.png',
                'https://imgur.com/vWoekpB.png'
            ];
            for (i = 0; i < cevaps.length; i++) {
                if(cevaps[i] == " "){
                    gizli += " "
                }
                else if(alfabe.indexOf(cevaps[i])){
                    gizli += "x"
                }
                bulunmayanlar.push(cevaps[i])

            } 
            while (!uwu){
                if(bulunmayanlar.length <= 0){
                    uwu = true
                    continue
                }
                if(haklar > 15){
                    uwu = true
                    continue
                }
                const firstEmbed = new Discord.MessageEmbed()
                    .setTitle("Adam Asmaca")
                    .addField('Soru:',`${gizli}`, true)
                    .addField('Konsept:',konsept, true)
                    .addField('Kaç Harf:',cevaps.length, true)
                    .addField('Kalan Hak:',`${15-haklar}`, true)
                    .addField('Soran:', `${message.author}`, true)
                    .addField('Yarışmacı:',user, true)
                    .setImage(hangmanPictures[haklar])
                message.channel.send(firstEmbed)
                const response = await message.channel.awaitMessages(neblm => neblm.author.id === user.id, { max: 1, time: 150000 });
                if(!response.first()) { 
                    this.games.delete(message.channel.id);
                    const agab = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`**⌛ | ${user}, Zaman Doldu**`)
                    message.channel.send(agab)
                }
                let cevap = response.first().content
                if(cevap === "İptal"){
                    return message.channel.send("iptal edildi.")
                }
                cevap = cevap.toUpperCase()
                
                if(cevap){
                    if(cevap.length == 1){
                        let varmı = 0
                        for (i = 0; i <= cevaps.length; i++) {
                            if(cevaps[i] == cevap){
                                varmı = 1
                            }
                        }
                        if(varmı == 0){
                            const agab = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setDescription(`**🚫 | ${user}, soruda böyle bir karakter bulunmuyor!**`)
                            message.channel.send(agab)
                            haklar+=1
                            continue
                        }
                        for (i = 0; i < cevaps.length; i++) {
                            let index = bulunmayanlar.indexOf(cevap)
                            if(index != -1){
                                bulunmayanlar.splice(index,1)
                                bulunanlar.push(cevap)
                            }
                        }
                        gizli = ""
                        for (i = 0; i < cevaps.length; i++) {
                            if(cevaps[i] == " "){
                                gizli += " "
                            }
                            else if(bulunmayanlar.indexOf(cevaps[i]) != -1){
                                gizli += "x"
                            }
                            else if(bulunanlar.indexOf(cevaps[i]) != -1){
                                gizli += `${cevaps[i]}`
                            }
                            
                        }
                    }else{
                        if(cevap === cevaps){
                            this.games.delete(message.channel.id);
                            const devamke2 = new Discord.MessageEmbed()
                            .setColor("RANDOM")
                            .setDescription(`**Tahminde Bulundun...**`)
                            await message.channel.send(devamke2)
                            uwu = true
                            break

                        }else{
                            this.games.delete(message.channel.id);
                            const devamke2 = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setDescription(`**💥 | ${user} bilemedin!**`)
                            await message.channel.send(devamke2)
                            haklar += 1
                            continue
                        }

                    }
                }
            }
            if(bulunmayanlar.length == 0 || uwu){
                this.games.delete(message.channel.id);
                const devamke2 = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**✅ | ${user} Kazandın! Süper!**`)
                await message.channel.send(devamke2)
            }
            if (haklar >= 15 || bilemedi) {
                this.games.delete(message.channel.id);
                const devamke2 = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`**💥 | ${user} kaybettin! Aranan soru cevabı : \`${cevaps}\`**`)
                await message.channel.send(devamke2)
            }else {
                this.games.delete(message.channel.id);
                return console.log('Bir hata oluştu')
            }
        }
    }
}
