import { Bot } from 'grammy';
import { config } from './config';

export const bot = new Bot(config.TELEGRAM_BOT_TOKEN);

bot.command('start', (ctx) => ctx.reply('Welcome! I am TrackerTommy.'));
bot.command('status', (ctx) => ctx.reply('Calculating your status...'));
