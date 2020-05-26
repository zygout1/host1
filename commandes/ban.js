const Discord = require('discord.js');

module.exports.run = (client, message, args) => {

  if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) { 
    return message.channel.send('Vous n\'avez pas la permission de bannir un utilisateur !').then(m => m.delete(5000)); }

  let logs = message.guild.channels.find("name", "logs");
  if(!logs) return message.channel.send("Veuillez créé un salon textuel se nommant \"logs\"").then(m => m.delete(5000));

  let user = message.mentions.users.first();
  if(!user) return message.reply("Veuillez mentionner un utilisateur !").then(m => m.delete(5000));

  message.mentions.users.first().send(`Vous vous êtes fait bannir du serveur **\"${message.guild.name}\"** par **\"${message.author.username}\"**`)

  let reason = args.join(" ");
  if(!reason) reason = "Aucune raison donée".then(m => m.delete(5000));

  message.guild.member(user).ban(reason);

  let logsEmbed = new Discord.RichEmbed()
  .setTitle("Utilisateur banni")
.setFooter("Logs de l\'utilisateur banni")
  .setColor("#ff0000")
  .setTimestamp()
  .addField("Utilisateur banni :", `${user}, ID: ${user.id}`)
  .addField("Raison :", reason)
  .addField("Modérateur :", `${message.author}, ID: ${message.author.id}`)
  .addField("Heure :", message.createdAt)
  message.delete().catch(O_o=>{}); 
  logs.send(logsEmbed);
}
module.exports.help = {
  name: "ban"
}