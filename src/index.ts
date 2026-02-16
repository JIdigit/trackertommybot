import { app } from './app.js';
import { bot } from './bot.js';
import { config } from './config.js';

import { exec } from 'child_process';
const port = config.PORT;

// Start Express server
app.listen(port, '0.0.0.0', () => {
  console.log(`TrackerTommy server is running on port ${port}`);
  
  // Initialize Database and Bot in background
  const setup = async () => {
    try {
      console.log('Synchronizing database schema...');
      // Execute db push to ensure tables exist
      await new Promise((resolve, reject) => {
        exec('npx prisma db push --accept-data-loss', (error, stdout, stderr) => {
          if (error) {
            console.error(`DB Push Error: ${stderr}`);
            reject(error);
          } else {
            console.log(stdout);
            resolve(stdout);
          }
        });
      });
      console.log('Database synchronized.');

      // Start Telegram bot
      await bot.start();
      console.log('TrackerTommy bot is running...');
    } catch (err) {
      console.error('Setup failed:', err);
      // Try to start bot anyway if DB fails
      bot.start().catch(e => console.error('Bot emergency start failed:', e));
    }
  };

  setup();
});
