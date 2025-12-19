const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "serverinfo",
  description: "It shows the server info",
  async execute(message, args) {
    const guild = message.guild;
    const owner = await guild.fetchOwner();
    const serverEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Server Information")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: "Server Name", value: `${guild.name}`, inline: true },
        { name: "Server ID", value: `${guild.id}`, inline: true },
        { name: "Server Owner", value: `${owner.user.tag}`, inline: true },
        {
          name: "Server Member Count",
          value: `${guild.memberCount}`,
          inline: true,
        },

        {
          name: "Server Created At",
          value: `${guild.createdAt.toLocaleString()}`,
          inline: true,
        },
        { name: "Locale", value: `${guild.preferredLocale}`, inline: true },

        { name: "Roles", value: `${guild.roles.cache.size}`, inline: true }
      )
      .setImage(guild.bannerURL({ size: 1024 }))
      .setFooter({
        text: `Sentinel • Requested by ${message.author.username}`,
      })
      .setTimestamp();

    message.reply({ embeds: [serverEmbed] });
  },
};
