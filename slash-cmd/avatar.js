const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var fs = require('fs');
const { normalize } = require('path');
const { description } = require('../commands/usage');
module.exports.name = "avatar";
module.exports.slashCmd = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Displays mentioned user or your profiles profile picture')
  .addUserOption(option =>
    option
      .setName('target')
      .setDescription('The user\'s avatar to show')
      .setRequired(false))
module.exports.runCmd = async (client, interaction, generalData) => {

  const user = interaction.options.getUser('target') || interaction.user;

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('webp')
        .setEmoji("<:MessageLink:1010885859735785553>")
        .setURL(`${user.displayAvatarURL({ extension: "webp", size: 4096 })}`)
        .setStyle(ButtonStyle.Link),
    )
    .addComponents(
      new ButtonBuilder()
        .setLabel('jpg')
        .setEmoji("<:MessageLink:1010885859735785553>")
        .setURL(`${user.displayAvatarURL({ extension: "jpg", size: 4096 })}`)
        .setStyle(ButtonStyle.Link),
    )
    .addComponents(
      new ButtonBuilder()
        .setLabel('png')
        .setEmoji("<:MessageLink:1010885859735785553>")
        .setURL(`${user.displayAvatarURL({ extension: "png", size: 4096 })}`)
        .setStyle(ButtonStyle.Link),
    )
  let embed = new EmbedBuilder()
    .setImage((user.displayAvatarURL({ extension: "png", size: 4096 })))
    .setFooter({ text: `${user.tag}` })
    .setColor("#7289da")
  await generalData.message.edit({ embeds: [embed], components: [row],ephemeral:true }).catch(() => {/*Ignore error*/ })



}
module.exports.info = {
  "name": "avatar",
  "description": "Displays mentioned user or your profiles profile picture",
  "usage": "avatar (user)",
  "category": "Utility",
  "perms": []
}
