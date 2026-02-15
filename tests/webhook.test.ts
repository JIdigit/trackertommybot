import { expect, test } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

test('POST /webhook/owntracks should return 200 for valid transition event', async () => {
  const payload = {
    _type: 'transition',
    event: 'enter',
    desc: 'School',
    tst: Math.floor(Date.now() / 1000),
  };

  const response = await request(app)
    .post('/webhook/owntracks')
    .send(payload);

  expect(response.status).toBe(200);
});

test('POST /webhook/owntracks should return 400 for invalid payload', async () => {
  const response = await request(app)
    .post('/webhook/owntracks')
    .send({ _type: 'invalid' });

  expect(response.status).toBe(400);
});
