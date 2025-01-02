const { default: axios } = require("axios");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");

dotenv.config();

const token = process.env.Bot_token;

console.log("Bot token loaded:", token);

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  try {
    const text = msg.text;
    console.log("Message received:", text);
    bot.sendMessage(msg.chat.id, "You said: " + text);
  } catch (error) {
    console.error("Error handling message:", error);
  }
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Hello I am vika Bot how can i assist you plese enter /joke for randome joke"
  );
});

bot.onText(/\/joke/, async (msg) => {
  const joke = await axios.get(
    "https://official-joke-api.appspot.com/random_joke"
  );
  const setup = joke.data.setup;
  const punchline = joke.data.punchline;
  bot.sendMessage(msg.chat.id, setup + " " + punchline);
});
