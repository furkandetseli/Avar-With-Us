const {Discord,servers,users,levels,rols,yetkilers} = require('./objeler');
const dl = require('./objeler');

module.exports = {
    name: "mute",
    async execute(message,args){
        return 
        let user = message.mentions.users.first();
        let role = message.guild.roles.find(r => r.name === "Muted");
        if(!role) message.guild.createRole({name: "Muted"});
        if(user.bot){
            return message.channel.send("I can't mute ${user} because he is a bot");
        }
        if(user.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("I can't mute ${user} because he is staff");
        }

        if(!user){
            message.channel.send(`There's no person to mute tho`);
        }
        message.guild.channels.forEach(f => {
            f.overwritePermissions(role, {
                SEND_MESSAGES: false
            });
            user.addRole(role);
        
        });
        message.channel.send(`I muted ${user}`);
    }
}