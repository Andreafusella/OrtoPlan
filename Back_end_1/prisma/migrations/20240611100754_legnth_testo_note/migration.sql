/*
  Warnings:

  - You are about to alter the column `testo` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Note` MODIFY `testo` VARCHAR(191) NOT NULL;
