/*
  Warnings:

  - Added the required column `titolo` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Note` ADD COLUMN `titolo` VARCHAR(191) NOT NULL;
