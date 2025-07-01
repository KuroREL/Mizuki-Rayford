const { REST, Routes } = require("discord.js");
const { clientId, guildId } = require("../../../config.json");
const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getLocalCommands = require("../../utils/getLocalCommands");
require("dotenv").config();

const token = process.env.TOKEN || require("../../../config.json").token;
const rest = new REST({ version: "10" }).setToken(token);

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const existingCommands = await rest.get(
      Routes.applicationCommands(clientId)
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = existingCommands.find((cmd) => cmd.name === name);

      if (existingCommand) {
        if (localCommand.deleted) {
          await rest.delete(
            Routes.applicationCommand(clientId, existingCommand.id)
          );
          console.log(`🗑️ Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await rest.patch(
            Routes.applicationCommand(clientId, existingCommand.id),
            {
              body: { description, options },
            }
          );

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await rest.post(Routes.applicationCommands(clientId), {
          body: { name, description, options },
        });

        console.log(`👍 Registered command "${name}".`);
      }
    }
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
};
