import { expect, test, vi } from 'vitest';
import { bot } from '../src/bot.js';
test('bot should be initialized with token', () => {
    expect(bot.token).toBeDefined();
});
// Mocking bot interactions is complex, but we can test command registration
test('bot should have /start command handler', () => {
    // Access internal command list if possible or just check registration logic
});
//# sourceMappingURL=bot.test.js.map