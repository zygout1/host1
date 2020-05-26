const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
   
    const useruser = "Commande demandé par : " + message.author.username;
    const userurl = message.author.avatarURL;
    let botembed = new Discord.RichEmbed()
        .setColor("#BFD5E2")
        .setDescription(`Chargement ...`)
        .setTimestamp()
    message.channel.send(botembed).then(message =>{
        botembed.setColor("#045FF")
        botembed.setDescription(`**Voici les commandes :**`)
        botembed.setThumbnail(`${client.user.displayAvatarURL}`)
        botembed.setFooter(useruser, userurl)
        botembed.addField("!info_moderation" , "Commande permettant de voir les commandes de modérations" )
        botembed.addField("!info_utilisateur" , "Commande permettant de voir les commandes pour les utilisateurs" )
        botembed.setTimestamp()
        message.edit(botembed)
    })

}
module.exports.help = {
    name: "info"
}