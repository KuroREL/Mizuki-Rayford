require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActivityType,
  EmbedBuilder,
  Events,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const messageHandler = require("./handlers/messageHandler");
const interactionHandler = require("./handlers/interactionHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  client.user.setActivity({
    name: "Managing REL Business",
    type: ActivityType.Playing,
  });
});

eventHandler(client);
messageHandler(client);
interactionHandler(client);

client.login(process.env.TOKEN);
