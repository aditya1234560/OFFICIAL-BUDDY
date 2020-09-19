const { Client, Collection, MessageAttachment, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const { default_prefix, token, COLOR } = require("./config.json");
const db = require("quick.db");
const fs = require("fs");
const discord = require("discord.js");
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const { addexp } = require("./handlers/xp.js");

let random = Math.floor(Math.random() * 4);
//for image ?
const client = new Client({
  disableEveryone: true
});
// for not taging everyone.
// Collections
client.db = require("quick.db");
client.canvas = require("canvacord")
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands");

// Run the command loader
["command"].forEach(handler => {
  //some error here
  require(`./handlers/${handler}`)(client);
});

client.on("ready", async () => {
  client.user.setActivity(db.get(`status`), { type: "WATCHING" });
  client.user.setPresence({
status: "dnd", 
activity: { 
name: `${db.get(`status`)}`, 
type: "WATCHING" 
} 
})

  console.log("ready as badass");
});
client.config = {
  api: process.env.api
};
client.queue = new Map();
client.on("message", async message => {
  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;
  if (!message.content.startsWith(prefix)) return;

  //YOUR CODE

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it y alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  // If a command is finally found
  if (command) {
    command.run(client, message, args);
    return addexp(message);
  }
});


client.on("guildMemberAdd", async member => {
   let chx = db.get(`welchannel_${member.guild.id}`);
  //defining var
  if (!chx) return;
  //u not define at random for image ?
  var images = [
    "https://wallpapercave.com/wp/wp6081521.jpg",
    "https://wallpapercave.com/wp/wp5128415.jpg",
    "https://wallpapercave.com/wp/wp5128398.jpg",
    "https://wallpapercave.com/wp/wp5700007.jpg",
    "https://wallpapercave.com/wp/wp5243211.jpg"
  ];
  let random = Math.floor(Math.random() * 5); //no i dont want 4 image 1 omly
  let data = await canva.welcome(member, { link: `${images[random]}` });
  const attachment = new MessageAttachment(data, "welcome-image.png");
  let msg = db.get(`welmsg_${member.guild.id}`)
  if(msg === null)
    msg = `WELCOME TO THE SERVER ${member.user},have a nice with other members !`
    client.channels.cache
    .get(chx)
  .send(attachment, msg)
}); //get channel and send embed

client.on("guildMemberRemove", async member => {
  //usage of welcome event
  let lul = db.get(`leavaannel_${member.guild.id}`);
  //defining 
  //its leave 
  const nobiya = new MessageEmbed()
  .setTitle("SAY-GOODBYE")
  .setColor("RANDOM")
  .setDescription(`@$member.user.uSAY-GOODBYE MEET YOU SOON!`)
  .setTimestamp()
  .setFooter(` ${member.user.username} j**st leftft the server !! **`) 
  const channel = client.channels.cache.get(lul) 
  return channel.send(nobiya)
 
   // i setde db //get channel and send embed  
//
  //error at leave od send :/ see log  log of send is un define  
  });
  client.on("message", async message => {
  if (message.author.client) return;

  if (message.content.indexof(default_prefix) !== 0) return;
  const args = message.content
    .slice(default_prefix.length)
    .tirm()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
});

//Stupid kid!
//define message lol
//ok im stupid u do it thank you ! mam
client.on("guildCreate", guild => {
  let join = new discord.MessageEmbed()
    .setColor("#00FFFF")
    .setTitle("New Server Joined")
    .addField("Server Members :", guild.memberCount)
    .addField("Server Name :", guild.name)
    .setThumbnail(guild.iconURL())
    .addField("Server Owner :", guild.owner)
    .addField("VERIFICATION LEVEL :", guild.verificationLevel);
  client.channels.cache.get("748936869022007376").send(join);
  console.log("NEW SERVER JOIN" + guild.name);
});
client.on("guildDelete", guild => {
  let join = new discord.MessageEmbed()
    .setColor("RED")
    .setTitle("LEFT FROM SERVER")
    .addField("Server Members :", guild.memberCount)
    .addField("Server Name :", guild.name)
    
    .addField("Server Owner :", guild.owner)
    .addField("VERIFICATION LEVEL :", guild.verificationLevel);
  client.channels.cache.get("748936869022007376").send(join);
  console.log("LEFT FROM SERVER" + guild.name);
});
     client.on("message", async message => {   
       let prefix = await db.get(`prefix_${message.guild.id}`) 
       if(prefix === null) 
         prefix = default_prefix; 
     if(message.mentions.has("@everyone")) return;  
  if(message.mentions.has(client.user)) {
    const luck = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle("PREFIX HELP! ")
    .setDescription(`HEY, MY PREFIX IN THIS SERVER IS **${prefix}**`)
    .setColor("RANDOM")
    .setFooter(`REQUESTED BY ${message.author.username}`)
   return message.channel.send(luck)
  }
     }
               )
  client.on("message", async message => {
  function Check(str) {
    if (
      client.emojis.cache.find(emoji => emoji.name === str) ||
      message.guild.emojis.cache.find(emoji => emoji.name === str)
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (message.content.startsWith(":") && message.content.endsWith(":")) {
    let EmojiName = message.content.slice(1, -1);

    if (Check(EmojiName) === true) {
      const channel = client.channels.cache.get(message.channel.id);
      try {
        let webhooks = await channel.fetchWebhooks();
        let webhook = webhooks.first();
        if (webhook === undefined || null || !webhook) {
          let Created = channel
            .createWebhook("BUDDYISOP")
            .then(async webhook => {
              const emoji =
                client.emojis.cache.find(e => e.name == EmojiName).id ||
                message.guild.emojis.cache.find(e => e.name === EmojiName).id;

              await webhook.send(`${client.emojis.cache.get(emoji)}`, {
                username: message.author.username,
                avatarURL: message.author.avatarURL({ dynamic: true })
              });
              message.delete();
            });
        }

        const emoji =
          client.emojis.cache.find(e => e.name == EmojiName).id ||
          message.guild.emojis.cache.find(e => e.name === EmojiName).id;

        await webhook.send(`${client.emojis.cache.get(emoji)}`, {
          username: message.author.username,
          avatarURL: message.author.avatarURL({ dynamic: true })
        });
        message.delete();
      } catch (error) {
        console.log(`Error :\n${error}`);
      }
    }}})
    
  

client.login(process.env.token);  
  
  