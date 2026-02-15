import { PrismaClient } from '@prisma/client';
export declare const prisma: PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare function recordAttendance(data: {
    event: string;
    location: string;
    timestamp: Date;
}): Promise<{
    event: string;
    location: string;
    timestamp: Date;
    createdAt: Date;
    id: number;
}>;
export declare function getRecentLogs(limit?: number): Promise<{
    event: string;
    location: string;
    timestamp: Date;
    createdAt: Date;
    id: number;
}[]>;
export declare function getWeeklyLogs(): Promise<{
    event: string;
    location: string;
    timestamp: Date;
    createdAt: Date;
    id: number;
}[]>;
export declare function getLastWeekLogs(): Promise<{
    event: string;
    location: string;
    timestamp: Date;
    createdAt: Date;
    id: number;
}[]>;
//# sourceMappingURL=storage.d.ts.map