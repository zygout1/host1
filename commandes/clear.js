module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Vous n\'avez pas la permission de supprimer des messages !").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Veuillez mettre un nombre de messages à supprimer .").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Désolé, je n\'ai pas la permission pour supprimer des messages .").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`J\'ai supprimé \"${deleted.size}\" messages !`)).then(m => m.delete(5000))
            .catch(err => message.reply(`Quelque chose a mal tourné ... ${err}`)).then(m => m.delete(5000))
    }
}

module.exports.help = {
    name: 'clear'
};