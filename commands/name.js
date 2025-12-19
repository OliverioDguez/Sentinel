module.exports = {
  name: "name",
  description: "Replies with the bot's name",
  execute(message, args) {
    const botName = message.client.user.username;
    message.reply(`My name is ${botName}`);
  },
};
