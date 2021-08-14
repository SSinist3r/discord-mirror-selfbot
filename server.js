const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================

//The token you want to forward messages from
//let usertoken = "";
//The token you want to forward messages to
//let botoken = "";
//The channels you want to forward from (channel IDs)
//let forwardfrom = ["", ""];
//The channels you want to forward to (channel IDs)
//let forwardto = [""];
//===============================================================================================
const Discord = require("discord.js-selfbot-v11");
const user = new Discord.Client();
if (process.env.ECHOBOT_CONFIG_JSON)
{
  config = JSON.parse(process.env.ECHOBOT_CONFIG_JSON);
}
user.login(config.usertoken);
user.on("ready", ready => {
  const bot = new Discord.Client();
  bot.login(config.botoken);
  user.on("message", message => {
    if (config.forwardfrom.includes(message.channel.id) ) {
      //forward message text
      if (typeof message.attachments.array()[0] == "undefined") {
        const embed = new Discord.RichEmbed()
        .setColor("#666666")
        //.setTitle("New Message!")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(message.content)
        //.setDescription(message.content)
        /*.setTimestamp()
        .setFooter(
          "Mirror Bot - Created by Carcraftz#5445",
          "https://cdn.glitch.com/4e652625-3b07-492f-b7ce-b1f8b1ab5bf0%2Fistockphoto-822836798-612x612.jpg?v=1570677107821"
          );*/
          for (let i = 0; i < config.forwardfrom.length; i++) 
          {
            if(config.forwardfrom[i] == message.channel.id)
            {
              if(i == 3)
              {
                bot.channels.get(config.forwardto[i]).send(embed);
              }
              else
              {
                bot.channels.get(config.forwardto[i]).send("By " + message.author.tag + ":     " + "**" + message.content + "**");
                //bot.channels.get(config.forwardto[i]).send(embed);
                //bot.channels.get(config.forwardto[1]).send(embed);
              }
              
            }
          } 
        /*forwardto.forEach(channel => {
          //bot.channels.get(channel).send("By " + message.author.tag + ":     " + message.content);
        });*/
      }
      //forward all attachments
      if (typeof message.attachments.array()[0] != "undefined") {
        var media = message.attachments.array();
        let urls = [];
        media.forEach(item => {
          urls.push(item.url);
        });
        for (let i = 0; i < config.forwardfrom.length; i++) 
          {
            if(config.forwardfrom[i] == message.channel.id)
            {
              bot.channels.get(config.forwardto[i]).send(message.author.tag + " Image URLs: " + urls.join("\n"));
            }
          }
        /*forwardto.forEach(channel => {
          bot.channels
          .get(channel)
          .send(message.author.tag + " Image URLs: " + urls.join("\n"));
        });*/
      }
      //forward all embeds
      message.embeds.forEach(embed1 => {
        let embedfinal = new Discord.RichEmbed(embed1);
        console.log(embedfinal);
        /*embedfinal.setFooter(
          "Mirror Bot - Created by Carcraftz#5445",
          "https://cdn.glitch.com/4e652625-3b07-492f-b7ce-b1f8b1ab5bf0%2Fistockphoto-822836798-612x612.jpg?v=1570677107821"
          );*/
        for (let i = 0; i < config.forwardfrom.length; i++) 
          {
            if(config.forwardfrom[i] == message.channel.id)
            {
              bot.channels.get(config.forwardto[i]).send(embedfinal);
            }
          }
        /*forwardto.forEach(channel => {
          bot.channels.get(channel).send(embedfinal);
        });*/
      });
    }
  });
});
