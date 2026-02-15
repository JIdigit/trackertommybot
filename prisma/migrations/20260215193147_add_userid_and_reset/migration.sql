/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AttendanceLog` table. All the data in the column will be lost.
  - Added the required column `userId` to the `AttendanceLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AttendanceLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL
);
INSERT INTO "new_AttendanceLog" ("event", "id", "location", "timestamp") SELECT "event", "id", "location", "timestamp" FROM "AttendanceLog";
DROP TABLE "AttendanceLog";
ALTER TABLE "new_AttendanceLog" RENAME TO "AttendanceLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
