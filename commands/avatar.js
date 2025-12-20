const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "avatar",
  description: "Displays your avatar or the avatar of a mentioned user",
  execute(message, args) {
    const targetUser = message.mentions.users.first() || message.author;
    const avatarUrl = targetUser.displayAvatarURL({
      size: 1024,
      dynamic: true,
    });
    const avatarEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${targetUser.username}'s avatar`)
      .setImage(avatarUrl)
      .setFooter({
        text: `Requested by: ${message.author.username} ID ${targetUser.id}`,
      })
      .setTimestamp();
    message.reply({ embeds: [avatarEmbed] });
  },
};
