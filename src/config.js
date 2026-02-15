import dotenv from 'dotenv';
dotenv.config();
export function getConfig() {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    if (!TELEGRAM_BOT_TOKEN && process.env.NODE_ENV !== 'test') {
        throw new Error('TELEGRAM_BOT_TOKEN is required');
    }
    return {
        PORT: Number(process.env.PORT) || 3000,
        TELEGRAM_BOT_TOKEN: TELEGRAM_BOT_TOKEN || '',
        DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
        NODE_ENV: process.env.NODE_ENV || 'development',
    };
}
export const config = getConfig();
//# sourceMappingURL=config.js.map