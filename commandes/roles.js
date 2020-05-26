const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  await message.delete();

  const a = message.guild.roles.get("697971991361355806");

  const embed = new Discord.RichEmbed()
    .setTitle(`Obtenez le rôle ${a.name}`)
    .setDescription(`Réagissez avec 🅰️ pour obtenir le rôle`)
    .setColor(0xdd9323);

  message.channel.send(embed).then(async (msg) => {
    await msg.react("🇦");

    msg
      .awaitReactions({
        time: 30000,
        errors: ["time"],
      })
      .then((collected) => {
        const reaction = collected.first();

        switch (reaction.emoji.name) {
          case "🇦":
            if (message.member.roles.has(a.id)) {
              msg.delete(2000);
              return message.channel
                .send("Vous avez déjà ce rôle !")
                .then((m) => m.delete(3000));
            } else {
              message.member.addRole(a).catch((err) => {
                console.log(err);
                return message.channel.send(`Erreur : **${err.message}**.`);
              });
              message.channel
                .send(`Vous avez bien eu le rôle **${a.name}** !`)
                .then((m) => m.delete(3000));
              break;
            }
        }
      })
      .catch(console.error);
  });
};

module.exports.help = {
  name: "rolereact",
};