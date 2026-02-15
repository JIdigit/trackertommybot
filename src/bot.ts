import { Bot, Keyboard } from 'grammy';
import { config } from './config';
import { getWeeklyLogs } from './storage';
import { calculateWeeklyAttendance } from './attendance';

export const bot = new Bot(config.TELEGRAM_BOT_TOKEN);

const mainKeyboard = new Keyboard()
  .text('📊 Status')
  .resized();

bot.command('start', (ctx) => 
  ctx.reply(
    '🏫 Welcome to TrackerTommy!\n\nI will automatically track your school attendance via OwnTracks.\n\nUse the button below or type /status to check your progress.',
    { reply_markup: mainKeyboard }
  )
);

async function sendStatus(ctx: any) {
  try {
    const logs = await getWeeklyLogs();
    const totalMinutes = calculateWeeklyAttendance(logs);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    const GOAL_HOURS = 20;
    const remainingMinutes = Math.max(0, GOAL_HOURS * 60 - totalMinutes);
    const remHours = Math.floor(remainingMinutes / 60);
    const remMins = remainingMinutes % 60;

    // Visual progress bar
    const progressPercent = Math.min(100, (totalMinutes / (GOAL_HOURS * 60)) * 100);
    const progressBarLength = 10;
    const filledBlocks = Math.round((progressPercent / 100) * progressBarLength);
    const emptyBlocks = progressBarLength - filledBlocks;
    const progressBar = '🟩'.repeat(filledBlocks) + '⬜'.repeat(emptyBlocks);

    let message = `📊 *Weekly Progress*\n\n`;
    message += `${progressBar} ${Math.round(progressPercent)}%\n\n`;
    message += `⏱ Total spent: *${hours}h ${minutes}m*\n`;
    message += `🎯 Weekly goal: *${GOAL_HOURS}h*\n`;
    
    if (remainingMinutes > 0) {
      message += `⏳ Remaining: *${remHours}h ${remMins}m*\n`;
    } else {
      message += `✅ Goal reached! Well done.\n`;
    }

    await ctx.reply(message, { 
      parse_mode: 'Markdown',
      reply_markup: mainKeyboard
    });
  } catch (error) {
    console.error('Status calculation error:', error);
    await ctx.reply('❌ Failed to calculate status. Please try again later.');
  }
}

bot.command('status', sendStatus);
bot.hears('📊 Status', sendStatus);
