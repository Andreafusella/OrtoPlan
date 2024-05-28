/*
  Warnings:

  - Added the required column `tipo` to the `Notifiche` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notifiche` ADD COLUMN `tipo` INTEGER NOT NULL;
