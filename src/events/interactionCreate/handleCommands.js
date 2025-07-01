const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const localCommands = getLocalCommands();
  const commandObject = localCommands.find(
    (cmd) => cmd.name === interaction.commandName
  );

  if (!commandObject) return;

  try {
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.user.id)) {
        await interaction.reply({
          content: `Only developers are allowed to run this command.`,
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (interaction.guild.id !== testServer) {
        await interaction.reply({
          content: `This command cannot be run here.`,
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          await interaction.reply({
            content:
              "You do not have the required permissions to use this command.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      const botMember = interaction.guild.members.me;

      for (const permission of commandObject.botPermissions) {
        if (!botMember.permissions.has(permission)) {
          await interaction.reply({
            content:
              "I don't have the required permissions to execute this command.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.error(`There was an error running this command: ${error}`);
    await interaction.reply({
      content: "There was an error while executing the command.",
      ephemeral: true,
    });
  }
};
