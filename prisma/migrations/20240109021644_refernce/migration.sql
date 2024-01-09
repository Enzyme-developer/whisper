/*
  Warnings:

  - You are about to drop the column `recipient` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_recipient_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "recipient",
ADD COLUMN     "recipientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("externalId") ON DELETE RESTRICT ON UPDATE CASCADE;
