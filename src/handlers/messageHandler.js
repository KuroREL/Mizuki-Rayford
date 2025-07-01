const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content === "duit") {
      return message.reply(
        "https://c.tenor.com/M3S9uMRtSEwAAAAd/tenor.gif"
      );
    }

    if (content === "jawa") {
      return message.reply(
        "https://c.tenor.com/K0gcpgxNkdcAAAAd/tenor.gif"
      );
    }

if (message.content.startsWith("!ava")) {
  const user = message.mentions.users.first() || message.author;
  const { id, avatar, username } = user;
  let avatarURL;

  if (avatar) {
    avatarURL = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=1024`;
  } else {
    // Use default avatar based on user ID (Discord has 5 default avatars: 0–4)
    const defaultAvatarIndex = Number(id) % 5;
    avatarURL = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
  }

      const avatarEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`${username}'s Avatar`)
        .setDescription(`Here is ${username}'s avatar! \n${avatarURL}`)
        .setImage(avatarURL)
        .setTimestamp();

      return message.channel.send({ embeds: [avatarEmbed] });
    }

    if (content === "!twitch") {
      const twitchProfilePictureURL =
        "https://static-cdn.jtvnw.net/jtv_user_pictures/1d204835-ee3a-410b-85b7-ab4ef636728d-profile_image-300x300.png";

      const twitchEmbed = new EmbedBuilder()
        .setColor("#6441a5")
        .setTitle("Follow me on Twitch!")
        .setDescription("It is what it is.")
        .setURL("https://www.twitch.tv/kurorel")
        .setThumbnail(twitchProfilePictureURL)
        .setTimestamp();

      return message.channel.send({ embeds: [twitchEmbed] });
    }

    if (content === "!youtube") {
      const youtubeProfilePictureURL =
        "https://static-cdn.jtvnw.net/jtv_user_pictures/1d204835-ee3a-410b-85b7-ab4ef636728d-profile_image-300x300.png";

      const youtubeEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Subscribe to my YouTube Channel!")
        .setDescription("Check out my latest videos and content on YouTube.")
        .setURL("https://www.youtube.com/@KuroREL")
        .setThumbnail(youtubeProfilePictureURL)
        .setTimestamp();

      return message.channel.send({ embeds: [youtubeEmbed] });
    }

    if (content === "!tako") {
      const saweriaEmbed = new EmbedBuilder()
        .setColor("#FFD700")
        .setTitle("Support me on Tako!")
        .setDescription(
          "If you'd like to support my content, you can do so through Tako."
        )
        .setURL("https://tako.id/KuroREL")
        .setThumbnail(
          "https://avatars.githubusercontent.com/u/139215619?s=200&v=4"
        )
        .setTimestamp();

      return message.channel.send({ embeds: [saweriaEmbed] });
    }

    if (content === "!streamlabs") {
      const streamlabsEmbed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("Support me on Streamlabs!")
        .setDescription("You can support my streams through Streamlabs.")
        .setURL("https://streamlabs.com/kurorel/tip")
        .setThumbnail(
          "https://javi.link/wp-content/uploads/2022/05/Streamlabs-Review.webp"
        )
        .setTimestamp();

      return message.channel.send({ embeds: [streamlabsEmbed] });
    }
  });
};
