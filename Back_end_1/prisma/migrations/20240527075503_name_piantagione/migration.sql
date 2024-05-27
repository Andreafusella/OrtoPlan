/*
  Warnings:

  - Added the required column `nome_piantagione` to the `Notifiche` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notifiche` ADD COLUMN `nome_piantagione` VARCHAR(191) NOT NULL;
