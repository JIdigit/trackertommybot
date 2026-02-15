import { Bot, Keyboard } from 'grammy';
import { config } from './config.js';
import { getWeeklyLogs, getLastWeekLogs } from './storage.js';
import { calculateWeeklyAttendance, calculateDailyAttendance } from './attendance.js';

export const bot = new Bot(config.TELEGRAM_BOT_TOKEN);

const mainKeyboard = new Keyboard()
  .text('📊 Status')
  .text('📅 History')
  .row()
  .resized();

bot.command('start', (ctx) => {
  const userId = ctx.from?.id;
  const url = `https://${config.PUBLIC_URL}/webhook/owntracks?user=${userId}`;
  
  return ctx.reply(
    `🏫 *Welcome to TrackerTommy!*\n\n` +
    `Your Telegram ID is: \`${userId}\`\n\n` +
    `*Setup Instructions:*\n` +
    `1. Open OwnTracks app.\n` +
    `2. Set Mode to *HTTP*.\n` +
    `3. In Connection -> Host, paste this URL:\n\n` +
    `\`${url}\`\n\n` +
    `4. Create a Region named \`School\` at your school's location.\n\n` +
    `I will then track your 20h weekly goal automatically!`,
    { parse_mode: 'Markdown', reply_markup: mainKeyboard }
  );
});

function formatMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

async function sendStatus(ctx: any) {
  try {
    const userId = ctx.from?.id.toString();
    if (!userId) return;

    const logs = await getWeeklyLogs(userId);
    const totalMinutes = calculateWeeklyAttendance(logs);
    
    const GOAL_HOURS = 20;
    const remainingMinutes = Math.max(0, GOAL_HOURS * 60 - totalMinutes);

    const progressPercent = Math.min(100, (totalMinutes / (GOAL_HOURS * 60)) * 100);
    const progressBarLength = 10;
    const filledBlocks = Math.round((progressPercent / 100) * progressBarLength);
    const emptyBlocks = progressBarLength - filledBlocks;
    const progressBar = '🟩'.repeat(filledBlocks) + '⬜'.repeat(emptyBlocks);

    let message = `📊 *Weekly Progress*\n\n`;
    message += `${progressBar} ${Math.round(progressPercent)}%\n\n`;
    message += `⏱ Total spent: *${formatMinutes(totalMinutes)}*\n`;
    message += `🎯 Weekly goal: *${GOAL_HOURS}h*\n`;
    
    if (remainingMinutes > 0) {
      message += `⏳ Remaining: *${formatMinutes(remainingMinutes)}*\n`;
    } else {
      message += `✅ Goal reached! Well done.\n`;
    }

    await ctx.reply(message, { 
      parse_mode: 'Markdown',
      reply_markup: mainKeyboard
    });
  } catch (error) {
    console.error('Status error:', error);
    await ctx.reply('❌ Failed to calculate status.');
  }
}

async function sendHistory(ctx: any) {
  try {
    const userId = ctx.from?.id.toString();
    if (!userId) return;

    const [thisWeekLogs, lastWeekLogs] = await Promise.all([
      getWeeklyLogs(userId),
      getLastWeekLogs(userId)
    ]);

    const dailyThisWeek = calculateDailyAttendance(thisWeekLogs);
    const totalLastWeek = calculateWeeklyAttendance(lastWeekLogs);

    let message = `📅 *Attendance History*\n\n`;
    
    message += `*This Week (Daily):*\n`;
    const days = Object.keys(dailyThisWeek).sort();
    if (days.length === 0) {
      message += `_No logs yet this week._\n`;
    } else {
      for (const day of days) {
        const date = new Date(day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const minutes = dailyThisWeek[day] ?? 0;
        message += `• ${dayName} (${day}): *${formatMinutes(minutes)}*\n`;
      }
    }

    message += `\n*Last Week Summary:*\n`;
    message += `⏱ Total: *${formatMinutes(totalLastWeek)}*\n`;

    await ctx.reply(message, { 
      parse_mode: 'Markdown',
      reply_markup: mainKeyboard
    });
  } catch (error) {
    console.error('History error:', error);
    await ctx.reply('❌ Failed to fetch history.');
  }
}

bot.command('status', sendStatus);
bot.hears('📊 Status', sendStatus);
bot.command('history', sendHistory);
bot.hears('📅 History', sendHistory);
