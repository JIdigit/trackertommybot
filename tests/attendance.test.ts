import { expect, test } from 'vitest';
import { calculateWeeklyAttendance } from '../src/attendance';

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
