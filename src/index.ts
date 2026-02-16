import { app } from './app.js';
import { bot, setDbReady, setDbError } from './bot.js';
import { config } from './config.js';

import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const schemaPath = path.join(rootDir, 'prisma', 'schema.prisma');

const port = config.PORT;

// Start Express server
app.listen(port, '0.0.0.0', () => {
  console.log(`TrackerTommy server is running on port ${port}`);
  
  // Initialize Database and Bot in background
  const setup = async () => {
    try {
      console.log('Ensuring database directory exists...');
      await new Promise((resolve) => exec('mkdir -p /app/prisma', resolve));

      console.log(`Synchronizing database schema using: ${schemaPath}`);
      // Execute db push with absolute schema path
      await new Promise((resolve, reject) => {
        exec(`npx prisma db push --accept-data-loss --schema="${schemaPath}"`, 
          { env: { ...process.env, DATABASE_URL: config.DATABASE_URL } }, 
          (error, stdout, stderr) => {
          if (error) {
            console.error(`DB Push Error: ${stderr}`);
            // Report error to bot readiness
            reject(new Error(stderr || 'Unknown Prisma Error'));
          } else {
            console.log(stdout);
            resolve(stdout);
          }
        });
      });
      console.log('Database synchronized.');
      setDbReady();

      // Start Telegram bot
      await bot.start();
      console.log('TrackerTommy bot is running...');
    } catch (err) {
      console.error('Setup failed:', err);
      setDbError(err instanceof Error ? err.message : String(err));
      // Try to start bot anyway if DB fails
      bot.start().catch(e => console.error('Bot emergency start failed:', e));
    }
  };

  setup();
});
