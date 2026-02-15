import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function recordAttendance(data: {
  event: string;
  location: string;
  timestamp: Date;
}) {
  return await prisma.attendanceLog.create({
    data: {
      event: data.event,
      location: data.location,
      timestamp: data.timestamp,
    },
  });
}

export async function getRecentLogs(limit = 10) {
  return await prisma.attendanceLog.findMany({
    take: limit,
    orderBy: { timestamp: 'desc' },
  });
}
