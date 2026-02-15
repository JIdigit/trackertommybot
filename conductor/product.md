# Initial Concept

I want to build the telegram bot, than will track my time spent in school. context: I should be in school minimum 20 hours per week, and sometimes I forget to track it manually. I want this bot to track it via geolocation automatically (we could use 2gis, yandexmaps apis, you can propose your alternative). The bot also should tell me how many hourse and minutes I have already been in the school, history of my visits, and the last weeks info.

# Product Definition - TrackerTommy

## Vision
A Telegram bot designed to help students automatically track their school attendance to ensure they meet a minimum requirement of 20 hours per week. By automating the tracking process, it eliminates the need for manual logs and provides students with clear, real-time data on their progress.

## Target Audience
- **Primary Users:** Students with mandatory weekly attendance requirements who want a "set-and-forget" solution for tracking.

## Core Features
- **Automated Geolocation Tracking:** Integration with the OwnTracks mobile app to receive background location updates via webhooks, automatically recording entry and exit from school boundaries.
- **Proactive Notifications:** The bot sends alerts regarding weekly progress, such as "You still need 5 hours this week," and provides daily summaries of time spent on campus.
- **Status Queries:** Users can check their current week's total time, remaining hours, and a detailed history of visits via Telegram commands.

## Future Roadmap
- **Smart Geofencing:** Integration with Google or Yandex Maps APIs to automatically define school boundaries and improve location accuracy.
