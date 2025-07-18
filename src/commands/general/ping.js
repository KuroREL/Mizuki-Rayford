module.exports = {
  name: "ping",
  description: "Check Ping",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(`Pong! Client ${ping}ms`);
  },
};
