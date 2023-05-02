-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gym_evaluations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "gymId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "gym_evaluations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "gym_evaluations_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_gym_evaluations" ("comment", "gymId", "id", "stars", "userId") SELECT "comment", "gymId", "id", "stars", "userId" FROM "gym_evaluations";
DROP TABLE "gym_evaluations";
ALTER TABLE "new_gym_evaluations" RENAME TO "gym_evaluations";
CREATE UNIQUE INDEX "gym_evaluations_userId_gymId_key" ON "gym_evaluations"("userId", "gymId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
