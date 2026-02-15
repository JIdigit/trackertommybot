import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function recordAttendance(data: {
  userId: string;
  event: string;
  location: string;
  timestamp: Date;
}) {
  return await prisma.attendanceLog.create({
    data: {
      userId: data.userId,
      event: data.event,
      location: data.location,
      timestamp: data.timestamp,
    },
  });
}

export async function getRecentLogs(userId: string, limit = 10) {
  return await prisma.attendanceLog.findMany({
    where: { userId },
    take: limit,
    orderBy: { timestamp: 'desc' },
  });
}

export async function getWeeklyLogs(userId: string) {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
  startOfWeek.setHours(0, 0, 0, 0);

  return await prisma.attendanceLog.findMany({
    where: {
      userId,
      timestamp: {
        gte: startOfWeek,
      },
    },
    orderBy: { timestamp: 'asc' },
  });
}

export async function getLastWeekLogs(userId: string) {
  const now = new Date();
  const startOfThisWeek = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
  startOfThisWeek.setHours(0, 0, 0, 0);
  
  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  
  return await prisma.attendanceLog.findMany({
    where: {
      userId,
      timestamp: {
        gte: startOfLastWeek,
        lt: startOfThisWeek,
      },
    },
    orderBy: { timestamp: 'asc' },
  });
}
