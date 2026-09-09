const{ EmbedBuilder,AttachmentBuilder } = require('discord.js');
const { default_prefix ,color,error,owner } = require("../config.json")
const axios = require('axios')
const talkedRecently = new Set();
module.exports = {
	name: 'ps4',
	description: 'returns an image of a ps4 disk',
	aliases:[],
	usage: '\```ps4 {user}\```',
  category: "image",
	guildOnly: false,
	args: false,
	permissions: {
		bot: [],
		user: [],
	},
	execute: async(message, args, client) => {
  let pingemoji = `<:allstarconnection:996699189432025180>`

        if (talkedRecently.has(message.author.id)) {
             message.react(`⌛`)
    } else {
      let mentionedMember = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
      
      axios.get(`https://reactselfbot.cc/api/generation.php?type=ps4&url=${(mentionedMember.user.displayAvatarURL({extension:"png",forceStatic:true,size:4096}))}`)
      .then(response => message.reply({embeds:[
        new EmbedBuilder()
        .setImage(`${response.data.url}`)
        .setColor(color)
      ]}))

      
      
      
      
        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 3500);
    }

	},
};
