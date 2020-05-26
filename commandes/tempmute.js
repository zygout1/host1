const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {



  if (!message.guild.member(message.author).hasPermission('MUTE_MEMBERS')) { 
    return message.channel.send('Vous n\'avez pas la permission de mute un utilisateur temporairement !').then(m => m.delete(5000)); }

    let logs = message.guild.channels.find("name", "logs");
    if(!logs) return message.channel.send("Veuillez créé un salon textuel se nommant \"logs\"").then(m => m.delete(5000));

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Veuillez mentionner un utilisateur !").then(m => m.delete(5000));
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Je ne peux pas mute cette utilisateur !").then(m => m.delete(5000));
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
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
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Veuillez précisez un nombre de temps à mute !").then(m => m.delete(5000));

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> c'est fait mute ${ms(ms(mutetime))}`).then(m => m.delete(5000));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> est maintenant unmute !`).then(m => m.delete(5000));
  }, ms(mutetime));

  let logsEmbed = new Discord.RichEmbed()
  .setTitle("Utilisateur mute")
.setFooter("Logs de l\'utilisateur mute")
  .setColor("#ff0000")
  .setTimestamp()
  .addField("Utilisateur mute :", `${user}, ID: ${user.id}`)
  .addField("Raison :", reason)
  .addField("Modérateur :", `${message.author}, ID: ${message.author.id}`)
  .addField("Heure :", message.createdAt)

  logs.send(logsEmbed);

//end of module
}

module.exports.help = {
  name: "tempmute"
}