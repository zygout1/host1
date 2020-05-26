const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: "!mute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["m", "nospeak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Vous n\'avez pas la permission de mute un utilisateur !").then(m => m.delete(5000));

let logs = message.guild.channels.find("name", "logs");
if(!logs) return message.channel.send("Veuillez créé un salon textuel se nommant \"logs\"").then(m => m.delete(5000));

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Je n\'ai pas la permission d\'ajouter un role !").then(m => m.delete(5000))

//define the reason and mutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Veuillez mentionnez un utilisateur à mute !").then(m => m.delete(5000));

let reason = args.slice(1).join(" ");
if(!reason) reason = "Aucune raison donnée"

//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Bonjour, vous êtes mute permanent sur le serveur \"**${message.guild.name}\"** pour : ${reason}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} c'est fait mute !`).then(m => m.delete(5000))
})

//send an embed to the modlogs channel
let logsEmbed = new Discord.RichEmbed() // Master is MessageEmbed
.setTitle("Utilisateur mute")
.setFooter("Logs de l\'utilisateur mute")
.setColor("#ff0000")
.setTimestamp()
.addField("Utilisateur mute :", `${user}, ID: ${user.id}`)
.addField("Raison :", reason)
.addField("Modérateur :", `${message.author}, ID: ${message.author.id}`)
.addField("Heure :", message.createdAt)

logs.send(logsEmbed);

let sChannel = message.guild.channels.find(c => c.name === "logs")
sChannel.send(embed)
    }
}
module.exports.help = {
    name: 'mute'
};