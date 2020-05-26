const Discord = require('discord.js');

    module.exports = bot => {
        console.log(`${bot.user.username} Est Online`)
       bot.user.setActivity("Bonjour !", {type: "ONLINE"});
   
       let statuses = [
           "https://discord.gg/JNgqmSj!",
           ` ${bot.users.size} Members!`,
       ]
   
       setInterval(function() {
           let status = statuses[Math.floor(Math.random() * statuses.length)];
           bot.user.setActivity(status, {type: "Watching"});


     
     
     
     
     
     
     
     
      }, 5000)

   
   }