exports.run = (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) { 
        return message.channel.send('Vous n\'avez pas la permission d\'envoyer un message avec le bot !').then(m => m.delete(5000)); }

    const response = args.join(' ');
    message.delete();
    message.channel.send(response);

};

exports.help = {
    name: 'say'
};