import { app } from './app.js';
import { bot } from './bot.js';
import { config } from './config.js';

const port = config.PORT;

// Start Express server
app.listen(port, '0.0.0.0', () => {
  console.log(`TrackerTommy server is running on port ${port}`);
});

// Start Telegram bot
bot.start();
console.log('TrackerTommy bot is running...');
