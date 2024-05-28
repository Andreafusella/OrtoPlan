/*
  Warnings:

  - Added the required column `data_save` to the `Savedata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Savedata` ADD COLUMN `data_save` DATETIME(3) NOT NULL;
