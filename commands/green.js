const{ EmbedBuilder,ButtonBuilder,ActionRowBuilder } = require('discord.js');
const { default_prefix ,color,error,owner } = require("../config.json")
const talkedRecently = new Set();
module.exports = {
	name: 'green',
	description: 'returns mentioned user profile picture in green color ',
	aliases: [],
	usage: ' \```YAML\n\n green {heist#0001} \``` ',
  category: "image",
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: async (message, args, client) => {
        
            if (talkedRecently.has(message.author.id)) {
             message.react(`⌛`)
    } else {


      let mentionedMember = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || client.users.cache.get(args[0])

         let str = 'green'
        if(!mentionedMember) {
              const row = new ActionRowBuilder()
        .addComponents(
         new ButtonBuilder()
         .setLabel('webp')
        .setEmoji("<:MessageLink:1010885859735785553>")
         .setURL(`${`https://some-random-api.ml/canvas/${str}?avatar=` + message.author.displayAvatarURL({extension: "webp", size: 4096})}`)
         .setStyle(ButtonStyle.Link),
        )
        .addComponents(
         new ButtonBuilder()
         .setLabel('jpg')
          .setEmoji("<:MessageLink:1010885859735785553>")
           .setURL(`${`https://some-random-api.ml/canvas/${str}?avatar=` + message.author.displayAvatarURL({extension: "jpg", size: 4096})}`)
         .setStyle(ButtonStyle.Link),
        )
        .addComponents(
         new ButtonBuilder()
         .setLabel('png')
          .setEmoji("<:MessageLink:1010885859735785553>")
          .setURL(`${`https://some-random-api.ml/canvas/${str}?avatar=` + message.author.displayAvatarURL({extension: "png", size: 4096})}`)
         .setStyle(ButtonStyle.Link),
        )
          let embed = new EmbedBuilder()
          .setImage((`https://some-random-api.ml/canvas/${str}?avatar=` + message.author.displayAvatarURL({ extension: "png", size: 4096 })))
          .setFooter({ text: `${message.author.tag}`})
          .setColor(color)
          await message.reply({embeds : [embed] , components: [row]}).catch(() => {/*Ignore error*/})
  
        }else{
         const row = new ActionRowBuilder()
        .addComponents(
         new ButtonBuilder()
         .setLabel('webp')
          .setEmoji("<:MessageLink:1010885859735785553>")
         .setURL(`${`https://some-random-api.ml/canvas/${str}?avatar=` + mentionedMember.user.displayAvatarURL({extension: "webp", size: 4096})}`)
         .setStyle(ButtonStyle.Link),
        )
        .addComponents(
         new ButtonBuilder()
         .setLabel('jpg')
          .setEmoji("<:MessageLink:1010885859735785553>")
           .setURL(`${`https://some-random-api.ml/canvas/${str}?avatar=` + mentionedMember.user.displayAvatarURL({extension: "jpg", size: 4096})}`)
         .setStyle(ButtonStyle.Link),
        )
        .addComponents(
         new ButtonBuilder()
         .setLabel('png')
          .setEmoji("<:MessageLink:1010885859735785553>")
          .setURL(`${`https://some-random-api.ml/canvas/${str}?avatar=` + mentionedMember.user.displayAvatarURL({extension: "png", size: 4096})}`)
           .setStyle(ButtonStyle.Link),
          )
         
          let embed = new EmbedBuilder()
          .setImage((`https://some-random-api.ml/canvas/${str}?avatar=` + mentionedMember.user.displayAvatarURL({ extension: "png", size: 4096 })))
          .setFooter({ text: `${mentionedMember.user.tag}`})
          .setColor(color)
          await message.reply({embeds:[embed] , components: [row]}).catch(() => {/*Ignore error*/})
        }
	}
            talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 3500);
    }
};
