import { app } from './app.js';
import { bot } from './bot.js';
import { config } from './config.js';

const port = config.PORT;

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Start Express server immediately for healthcheck
app.listen(port, '0.0.0.0', async () => {
  console.log(`TrackerTommy server is running on port ${port}`);

  try {
    // Run migrations in the background after server starts
    console.log('Running database migrations...');
    await execAsync('npx prisma migrate deploy');
    console.log('Migrations completed successfully.');

    // Start Telegram bot
    bot.start();
    console.log('TrackerTommy bot is running...');
  } catch (error) {
    console.error('Startup error:', error);
  }
});
