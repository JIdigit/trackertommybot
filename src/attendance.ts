export function calculateWeeklyAttendance(logs: { event: string; timestamp: Date }[]) {
  let totalMinutes = 0;
  let lastEnter: Date | null = null;

  // Sort logs by timestamp ascending
  const sortedLogs = [...logs].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  for (const log of sortedLogs) {
    if (log.event === 'enter') {
      lastEnter = log.timestamp;
    } else if (log.event === 'leave' && lastEnter) {
      const diffMs = log.timestamp.getTime() - lastEnter.getTime();
      totalMinutes += Math.floor(diffMs / (1000 * 60));
      lastEnter = null;
    }
  }

  // If still in school, add time until now
  if (lastEnter) {
    const diffMs = new Date().getTime() - lastEnter.getTime();
    totalMinutes += Math.floor(diffMs / (1000 * 60));
  }

  return totalMinutes;
}

export function calculateDailyAttendance(logs: { event: string; timestamp: Date }[]) {
  const dailyTotals: Record<string, number> = {};
  let lastEnter: Date | null = null;

  const sortedLogs = [...logs].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  for (const log of sortedLogs) {
    const dayKey = log.timestamp.toISOString().split('T')[0]!;
    
    if (log.event === 'enter') {
      lastEnter = log.timestamp;
    } else if (log.event === 'leave' && lastEnter) {
      const diffMs = log.timestamp.getTime() - lastEnter.getTime();
      const minutes = Math.floor(diffMs / (1000 * 60));
      
      dailyTotals[dayKey] = (dailyTotals[dayKey] ?? 0) + minutes;
      lastEnter = null;
    }
  }

  // Handle open session for TODAY
  if (lastEnter) {
    const dayKey = lastEnter.toISOString().split('T')[0]!;
    const diffMs = new Date().getTime() - lastEnter.getTime();
    const minutes = Math.floor(diffMs / (1000 * 60));
    dailyTotals[dayKey] = (dailyTotals[dayKey] ?? 0) + minutes;
  }

  return dailyTotals;
}
