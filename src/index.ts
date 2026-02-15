import { app } from './app';
import { bot } from './bot';
import { config } from './config';

const port = config.PORT;

// Start Express server
app.listen(port, () => {
  console.log(`TrackerTommy server is running on port ${port}`);
});

// Start Telegram bot
bot.start();
console.log('TrackerTommy bot is running...');
