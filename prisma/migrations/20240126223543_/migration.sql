/*
  Warnings:

  - The `votes` column on the `Poll` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "votes",
ADD COLUMN     "votes" JSONB[];
