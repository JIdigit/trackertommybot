# TrackerTommy Bot

Telegram bot to track school attendance (20h weekly goal) via OwnTracks webhooks.

## Tech Stack
- Node.js (TypeScript)
- grammY (Telegram Bot Framework)
- Prisma + SQLite
- Express (Webhook receiver)

## Deployment on Railway

1. Connect this repo to Railway.
2. Add a **Volume** mounted at `/app/prisma` for persistent SQLite storage.
3. Set environment variables:
   - `TELEGRAM_BOT_TOKEN`: Your bot token.
   - `DATABASE_URL`: `file:/app/prisma/dev.db`
4. Configure OwnTracks to send webhooks to `https://your-app.up.railway.app/webhook/owntracks`.
