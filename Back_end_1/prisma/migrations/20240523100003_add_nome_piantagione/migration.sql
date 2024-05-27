/*
  Warnings:

  - Added the required column `nome` to the `Piantagione` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Piantagione` ADD COLUMN `nome` VARCHAR(191) NOT NULL;
