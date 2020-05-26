const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) { 
        return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande !').then(m => m.delete(5000)); }
   
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
        botembed.addField("!ban" , "Sert à bannir un utilisateur ! (EX : !ban ZyGout Insulte a multiples reprises)" )
        botembed.addField("!kick" , "Sert à expulser un utilisateur ! (EX : !kick @ZyGout Spam)" )
        botembed.addField("!clear" , "Sert à supprimer des messages ! (EX : !clear 100) **MAX 100**" )
        botembed.addField("!say" , "Sert à envoyer un message depuis le bot ! (EX : !say Salut !) !")
        botembed.addField("!mute" , "Sert a mute temporairement un utilisateur ! (EX : !mute @ZyGout) !")
        botembed.addField("!tempmute" , "Sert a mute temporairement un utilisateur ! (EX : !mute @ZyGout 5m) (seconde = s, minute = m, heure = h, jour = d, semaine = w, mois = w, ans = y)**" )
        botembed.setTimestamp()
        message.edit(botembed)
    })

}
module.exports.help = {
    name: "info_moderation"
}