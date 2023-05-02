/*
  Warnings:

  - A unique constraint covering the columns `[userId,gymId]` on the table `gym_evaluations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gym_evaluations_userId_gymId_key" ON "gym_evaluations"("userId", "gymId");
