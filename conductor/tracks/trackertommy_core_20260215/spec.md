# Specification - Create the core TrackerTommy functionality

## Overview
This track focuses on building the foundational components of TrackerTommy, a Telegram bot that automatically tracks school attendance via geolocation (OwnTracks webhooks).

## Scope
- Set up a basic Node.js/Express server to receive OwnTracks webhooks.
- Implement a Telegram bot interface for basic status queries.
- Create a data storage mechanism (e.g., SQLite or a simple JSON file) to log entry and exit events.
- Calculate and display weekly attendance progress.

## Success Criteria
- The server successfully receives and parses OwnTracks webhook payloads.
- Users can query their current week's total time via the Telegram bot.
- Entry and exit events are accurately recorded and stored.
