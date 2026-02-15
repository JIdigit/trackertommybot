# Tech Stack - Otsidka Tracker

## Backend & Logic
- **Language:** Node.js with TypeScript (for type safety and modern features).
- **Bot Framework:** [grammY](https://grammy.dev/) - A high-performance and developer-friendly Telegram Bot API framework.
- **Runtime:** Node.js (LTS version).

## Data Storage
- **Database:** SQLite - A lightweight, file-based SQL database ideal for individual or small-scale tracking applications.
- **ORM:** Prisma or Drizzle ORM - To provide type-safe database access and migrations.

## Geolocation Integration
- **Mobile Client:** OwnTracks (Open Source) - Used by the student to send background location updates.
- **Protocol:** HTTP Private Mode - OwnTracks will send JSON payloads to a dedicated webhook endpoint on our backend.

## Infrastructure & Deployment
- **Web Server:** Fastify or Express - To handle incoming webhooks from both Telegram and OwnTracks.
- **Hosting:** VPS (e.g., DigitalOcean, Hetzner) or a local server with a secure tunnel (e.g., Cloudflare Tunnel) to provide a public HTTPS endpoint for webhooks.
