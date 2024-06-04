/*
  Warnings:

  - Made the column `mese_fine` on table `Pianta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mese_inizio` on table `Pianta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Pianta` MODIFY `mese_fine` VARCHAR(191) NOT NULL,
    MODIFY `mese_inizio` VARCHAR(191) NOT NULL;
