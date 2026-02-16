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

  // Run migrations first
  try {
    console.log('Ensuring prisma directory exists...');
    await execAsync('mkdir -p /app/prisma');
    
    console.log('Running database migrations...');
    await execAsync('npx prisma migrate deploy');
    console.log('Migrations completed successfully.');

    // Start Telegram bot ONLY after migrations are done
    bot.start().catch(err => console.error('Bot error:', err));
    console.log('TrackerTommy bot is running...');
  } catch (error) {
    console.error('Migration error:', error);
    // Even if migration fails, try to start bot so we can at least see it's alive
    bot.start().catch(err => console.error('Bot error after migration failure:', err));
  }
});
