const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const db = require("quick.db")

const { Color } = require("../../config.json");

module.exports = {

  name: "setsuggest",

  aliases: ["ss"],

  category: "Administration",

  description: "set a Suggestion channel",

  usage: "ss <Mention channel]",

  accessableby: "mod",

  run: async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_CHANNELS")){

      return message.channel.send('Sry you dont have enough permission set Suggestions channel')

      }

    

    let channel = message.mentions.channels.first();

    if (!channel) {

      return message.channel.send('Pls Choose a channel which is in this guild')

    }

    

    db.set(`sschannel_${message.guild.id}`,channel.id);

    

     

    

    

    message.channel.send(`Now all suggestions will be send to ${channel}`)

    

  }

}