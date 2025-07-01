module.exports = {
    name: "roll",
    description: "Rolls a random number between 1 and 100.",

    callback: async (client, interaction) => {
        const roll = Math.floor(Math.random() * 100) + 1;
        await interaction.reply(`🎲 You rolled a **${roll}**!`);
    },
};