import { expect, test, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { recordAttendance } from '../src/storage';

const prisma = new PrismaClient();

test('recordAttendance should save a log entry', async () => {
  const eventData = {
    event: 'enter',
    location: 'School',
    timestamp: new Date(),
  };

  const savedLog = await recordAttendance(eventData);

  expect(savedLog.id).toBeDefined();
  expect(savedLog.event).toBe('enter');
  expect(savedLog.location).toBe('School');

  // Cleanup
  await prisma.attendanceLog.delete({ where: { id: savedLog.id } });
});
