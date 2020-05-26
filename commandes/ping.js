module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Chargement...`);

        msg.edit(`
        La latence du serveur : ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
La latence de l'API : ${Math.round(client.ping)}ms`);
    }
}
module.exports.help = {
    name: 'ping'
};