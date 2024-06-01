module.exports = {
    name: "ping",
    aliases: ["p","skr"],
    execute(message,args){
        return message.channel.send("pong")
    }
}