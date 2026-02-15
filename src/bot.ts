import { Bot } from 'grammy';
import { config } from './config';
import { getWeeklyLogs } from './storage';
import { calculateWeeklyAttendance } from './attendance';

export const bot = new Bot(config.TELEGRAM_BOT_TOKEN);

bot.command('start', (ctx) => ctx.reply('🏫 Welcome to TrackerTommy!\n\nI will automatically track your school attendance via OwnTracks.\n\nUse /status to check your progress.'));

bot.command('status', async (ctx) => {
  try {
    const logs = await getWeeklyLogs();
    const totalMinutes = calculateWeeklyAttendance(logs);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    const GOAL_HOURS = 20;
    const remainingMinutes = Math.max(0, GOAL_HOURS * 60 - totalMinutes);
    const remHours = Math.floor(remainingMinutes / 60);
    const remMins = remainingMinutes % 60;

    let message = `📊 *Weekly Progress*\n\n`;
    message += `⏱ Total spent: *${hours}h ${minutes}m*\n`;
    message += `🎯 Weekly goal: *${GOAL_HOURS}h*\n`;
    
    if (remainingMinutes > 0) {
      message += `⏳ Remaining: *${remHours}h ${remMins}m*\n`;
    } else {
      message += `✅ Goal reached! Well done.\n`;
    }

    await ctx.reply(message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Status command error:', error);
    await ctx.reply('❌ Failed to calculate status. Please try again later.');
  }
});
