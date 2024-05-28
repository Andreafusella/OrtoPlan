/*
  Warnings:

  - Added the required column `data_invio` to the `Notifiche` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notifiche` ADD COLUMN `data_invio` DATETIME(3) NOT NULL;
