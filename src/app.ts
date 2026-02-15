import express from 'express';
import { z } from 'zod';

export const app = express();
app.use(express.json());

const OwnTracksTransitionSchema = z.object({
  _type: z.literal('transition'),
  event: z.enum(['enter', 'leave']),
  desc: z.string(),
  tst: z.number(),
});

app.post('/webhook/owntracks', (req, res) => {
  const result = OwnTracksTransitionSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const { event, desc, tst } = result.data;
  console.log(`Received OwnTracks event: ${event} for ${desc} at ${tst}`);

  // TODO: Save to database in next task
  
  res.status(200).json({ status: 'ok' });
});
