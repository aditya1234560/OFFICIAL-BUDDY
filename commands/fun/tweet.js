const Random = require("srod-v2");
module.exports = {
  name: "tweet",
  category: "fun",
  description: "Make joke of ur Friends 😂",
  usage: "<@mention> <message>",
  aliases: ["tw"],
  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.author;
    if (!user) return message.channel.send("MENTION USER PLEASE");
    let mm = args.slice(1).join(" ");
    if (mm === null) return message.channel.send("Provide tweet message ");

    let TweetEmbed =  await Random.Tweet(args[0], mm, "BLUE");
    console.log(TweetEmbed)
    message.channel.send(TweetEmbed);//else work or not idk lets try
  }}