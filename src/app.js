import express from 'express';
import { z } from 'zod';
import { recordAttendance } from './storage.js';
export const app = express();
app.use(express.json());
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
const OwnTracksTransitionSchema = z.object({
    _type: z.literal('transition'),
    event: z.enum(['enter', 'leave']),
    desc: z.string(),
    tst: z.number(),
});
app.post('/webhook/owntracks', async (req, res) => {
    const result = OwnTracksTransitionSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: 'Invalid payload' });
    }
    const { event, desc, tst } = result.data;
    console.log(`Received OwnTracks event: ${event} for ${desc} at ${tst}`);
    try {
        await recordAttendance({
            event,
            location: desc,
            timestamp: new Date(tst * 1000),
        });
        res.status(200).json({ status: 'ok' });
    }
    catch (error) {
        console.error('Failed to record attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//# sourceMappingURL=app.js.map