const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  let reportsChannel = message.guild.channels.find(`name`, "signalements") 
  if(!reportsChannel) return message.channel.send("Veuillez créé un salon textuel se nomment \"signalements\" !").then(m => m.delete(5000));

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Veuillez mentionnez un utilisateur à signalé !").then(m => m.delete(5000));
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
    .setDescription("Nouveau signalement")
    .setColor("#B90702")
    .addField("Utilisateur signalé :", `${rUser} with ID: ${rUser.id}`)
    .addField("Signalé par :", `${message.author} with ID: ${message.author.id}`)
    .addField("Heure :", message.createdAt)
    .addField("Raison :", reason);



  message.delete().catch(O_o=>{}); 

  return reportsChannel.send(reportEmbed);
}

module.exports.help = {
  name : "report"
}