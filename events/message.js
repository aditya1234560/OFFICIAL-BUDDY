const db = require('quick.db')
const { addexp } = require("../handlers/xp.js");
const { MessageEmbed, discord} = require('discord.js')
const { ownerID, ownerID2, default_prefix } = require("../config.json");
const { badwords } = require("../data.json") 
let cooldown = {}

module.exports.run = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.author) return;
  

  addexp(message);


  //START

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    let confirm = false;

    //NOW WE WILL USE FOR LOOP

    var i;

    for (i = 0; i < badwords.length; i++) {
      if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      message.delete();

      let gp = new MessageEmbed()

        .setTitle("**ANTI-BADWORD**")

        .setDescription(` YOU ARE NOT ALLOWED TO SEND BAD WORDS HERE!`)

        .setFooter("STOP USING BAD WORDS")

        .setColor("GREEN")

        .setTimestamp();

      return message.channel.send(gp);
   
const { oks } = require("../link.json");


  //START

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    let confirm = false;

    //NOW WE WILL USE FOR LOOP

    var i;

    for (i = 0; i < oks.length; i++) {
      if (message.content.toLowerCase().includes(oks[i].toLowerCase()))
        confirm = true;
    }

    if (confirm) {
      let g = await db.get(`${message.guild.id}`);
      if (g === null) return;
      if (g === true) return;

      message.delete();

      let gp = new MessageEmbed()

        .setTitle("**ANTI-LINK**")

        .setDescription(` YOU ARE NOT ALLOWED TO SEND link HERE!`)

        .setFooter("STOP USING LINKS")

        .setColor("GREEN")

        .setTimestamp();

      return message.channel.send(gp);


  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;
  if (message.mentions.has("@everyone")) return;

  if (message.mentions.has(client.user)) {
    const luck = new MessageEmbed()

      .setAuthor( "PREFIX ! | " + message.guild.name )

    

      .setDescription(`HEY, MY PREFIX IN THIS SERVER IS ` + "`" + prefix +"`")

      .setColor("ORANGE")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true }))

      .setFooter(`REQUESTED BY ${message.author.username}`);
  
return message.channel.send(luck);}
  
    
  
  let bruh = await db.fetch(`g_${message.guild.id}`);
  if (message.author.bot) return;

  let set = bruh; //await client.db.get(`g_${message.guild.id}`);
  if (message.channel.id === set) {
    const embed = new MessageEmbed()
      .setTitle(message.author.username + " | ID: " + message.author.id)
      .setColor("#00FFFF")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(message.content)
      .setFooter(
        message.author.tag + " | From: " + message.guild.name,
        message.guild.iconURL({ dynamic: true })
      ) //.then(message.delete());
      .setTimestamp();
    setTimeout(() => {
      message.delete();
    }, 1000);

    client.guilds.cache.forEach(async g => {
      //async function wowasync() {
      try {
        let gl = await db.get(`g_${g.id}`);
        //message.guild.channels.cache.get(bruh).send(embed)
        //console.log(client.db.get(`g_${g.id}`))
        //client.channels.cache.get(client.db.get(`g_${g.id}`)).send(embed);
        client.channels.cache.get(gl).send(embed);
      } catch (e) {
        return;
      }
    });
  }

 

 




  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member =  message.guild.members.fetch(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));


  if (!command) return;

  //-------------------------------------------- P E R M I S S I O N -------------------------------------------



  if (command.botPermission) {
    let neededPerms = []

    command.botPermission.forEach(p => {
      if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`")
    })

    if (neededPerms.length) return message.channel.send(`I need ${neededPerms.join(", ")} permission(s) to execute the command!`)
  } else if (command.authorPermission) {
    let neededPerms = []


    command.authorPermission.forEach(p => {
      if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`")
    })

    if (neededPerms.length) return message.channel.send(`You need ${neededPerms.join(", ")} permission(s) to execute the command!`)
  }

  // ---------------------------------------------O W N E R ------------590550961232019466----------------------------------------------

  if (command.ownerOnly) {
    let dickheads = ["480285300484997122", "576893842058641412", "590550961232019466"];
    if (!dickheads.includes(message.author.id)) return message.channel.send("This command can only be use by owner :)")
  }

  //------------------------------------------------------COOLDOWN SYSTEM---------------------------------------------

  let uCooldown = cooldown[message.author.id];

  if (!uCooldown) {
    cooldown[message.author.id] = {}
    uCooldown = cooldown[message.author.id]
  }

  let time = uCooldown[command.name] || 0

  if (time && (time > Date.now())) return message.channel.send(`You can again use this command in ${Math.ceil((time - Date.now()) / 1000)} second(s)`) //YOU CAN USE PARSE MS TO GET BETTER responce

  cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

  //NOW LETS TEST

  //-----------------------------------------------------------------------------------------------------------------

  if (command) command.run(client, message, args);






 
//------------------------------end--
  
  

//-------------------------------------------- F U N C T I O N ------------------------------------------
 }}}}}