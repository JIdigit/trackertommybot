import { expect, test } from 'vitest';
import { calculateWeeklyAttendance, calculateDailyAttendance } from '../src/attendance';

test('calculateWeeklyAttendance should return 0 if no logs', () => {
  expect(calculateWeeklyAttendance([])).toBe(0);
});

test('calculateWeeklyAttendance should calculate duration between enter and leave', () => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  
  const logs = [
    { event: 'enter', timestamp: oneHourAgo },
    { event: 'leave', timestamp: now },
  ];
  
  expect(calculateWeeklyAttendance(logs as any)).toBe(60); // minutes
});

test('calculateWeeklyAttendance should handle current session', () => {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
  
  const logs = [
    { event: 'enter', timestamp: thirtyMinutesAgo },
  ];
  
  expect(calculateWeeklyAttendance(logs as any)).toBe(30);
});

test('calculateDailyAttendance should group minutes by day', () => {
  const day1 = new Date('2026-02-10T10:00:00Z');
  const day1Exit = new Date('2026-02-10T11:00:00Z');
  const day2 = new Date('2026-02-11T10:00:00Z');
  const day2Exit = new Date('2026-02-11T12:00:00Z');

  const logs = [
    { event: 'enter', timestamp: day1 },
    { event: 'leave', timestamp: day1Exit },
    { event: 'enter', timestamp: day2 },
    { event: 'leave', timestamp: day2Exit },
  ];

  const result = calculateDailyAttendance(logs as any);
  expect(result['2026-02-10']).toBe(60);
  expect(result['2026-02-11']).toBe(120);
});
