import { expect, test, vi } from 'vitest';
import { getConfig } from '../src/config';

test('config should have default port 3000 if PORT is not set', () => {
  vi.stubEnv('PORT', '');
  const config = getConfig();
  expect(config.PORT).toBe(3000);
});

test('config should use PORT from environment', () => {
  vi.stubEnv('PORT', '4000');
  const config = getConfig();
  expect(config.PORT).toBe(4000);
});

test('config should throw error if TELEGRAM_BOT_TOKEN is missing and not in test env', () => {
  vi.stubEnv('TELEGRAM_BOT_TOKEN', '');
  vi.stubEnv('NODE_ENV', 'production');
  expect(() => getConfig()).toThrow('TELEGRAM_BOT_TOKEN is required');
});
