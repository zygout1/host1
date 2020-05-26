const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

client.login("")


client.commands = new Discord.Collection();

fs.readdir("./commandes/",(error, f) => {
  if(error) console.log(error);

  let commandes = f.filter(f => f.split('.').pop() === 'js')
    if(commandes.length <= 0) return console.log("Aucune commande trouvée !");
  commandes.forEach((f) => {

      let commande = require(`./commandes/${f}`)
      console.log(`${f} commandes chargées !`);

  client.commands.set(commande.help.name , commande);
  });
});
fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargements`);

    f.forEach((f) => {
        const events = require(`./events/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));

    });
});
