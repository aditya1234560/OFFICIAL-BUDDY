const { MessageEmbed } = require("discord.js")
const Genius = new (require("genius-lyrics")).Client("ZD_lLHBwRlRRfQvVLAnHKHksDHQv9W1wm1ZAByPaYo1o2NuAw6v9USBUI1vEssjq")
const { COLOR } = require("../../config.json");

module.exports = {
  name: "lyrics",
  category: "music",
  description: "Get lyrics of song :v",
 run: async  (client, message, args) => {
    let embed = new MessageEmbed()
    .setDescription("Looking For Lyrics ...")
    .setColor("YELLOW")
    
    if(!args.length) {
      return message.channel.send("Please Give The Song Name")
    }
    
    const msg = await message.channel.send(embed)
     try {
          const songs = await Genius.songs.search(args.join(" "), { limit: args.join(" ")});
          const lyrics = await songs[0].lyrics();
          const song = songs[0];
           if (lyrics.length > 4095) {
             msg.delete()
        return message.channel.send('Lyrics are too long to be returned as embed');
     }
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
        .setTitle(song.title)
          .setColor(COLOR)
        .setThumbnail(song.thumbnail)
          .setDescription(lyrics.trim());
        
        return msg.edit(lyricsEmbed);
      } else {
        // lyrics.length > 2048
        const firstLyricsEmbed = new MessageEmbed()
        .setTitle(song.title)
          .setColor(COLOR)
        .setThumbnail(song.thumbnail)
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed = new MessageEmbed()
        .setTitle(song.title)
          .setColor(COLOR)
        .setThumbnail(song.thumbnail)
          .setDescription(lyrics.slice(2048, lyrics.length));
        msg.edit(firstLyricsEmbed);
        message.channel.send(secondLyricsEmbed);
        return;
      }
      
       
     } catch(e) {
       
       embed.setDescription("Got err : " + e)
       msg.edit(embed)
          console.log(e);
     }
    
    
  }
  
}