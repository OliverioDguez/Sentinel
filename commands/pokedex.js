const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pokedex",
  description: "Search for information about a Pokémon in the PokéAPI",
  async execute(message, args) {
    if (args.length === 0) {
      message.reply("Please provide a Pokemon name");
    }
    const pokeName = args[0].toLowerCase();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );
      if (!response.ok) {
        message.reply("Pokemon not found");
      }
      const data = await response.json();

      // Data Extraction
      const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const id = data.id;
      const type = data.types.map((t) => t.type.name).join(", ");
      const hp = data.stats[0].base_stat;
      const atk = data.stats[1].base_stat;
      const def = data.stats[2].base_stat;
      const spriteHD =
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default;

      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle(`${name} #${id}`)
        .setDescription(`**Types:** ${type}`)
        .addFields(
          { name: "HP", value: `${hp}`, inline: true },
          { name: "Attack", value: `${atk}`, inline: true },
          { name: "Defense", value: `${def}`, inline: true }
        )
        .setImage(spriteHD)
        .setTimestamp();

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred");
    }
  },
};
