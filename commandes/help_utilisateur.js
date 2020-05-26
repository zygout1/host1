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
        botembed.addField("!ping" , "Sert à voir le ping du serveur" )
        botembed.addField("!report" , "Sert à signalé une personne (EX : !report @ZyGout Insulte)" )
        botembed.addField("!discord" , "Sert à voir mon discord" )
        botembed.addField("!bot" , "Sert à voir le lien d'invitation pour m'ajouter à votre serveur discord" )
        botembed.setTimestamp()
        message.edit(botembed)
    })

}
module.exports.help = {
    name: "help_utilisateur"
}