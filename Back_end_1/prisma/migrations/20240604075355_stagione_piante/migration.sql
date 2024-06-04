/*
  Warnings:

  - You are about to drop the column `data_fine` on the `Pianta` table. All the data in the column will be lost.
  - You are about to drop the column `data_inizio` on the `Pianta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Pianta` DROP COLUMN `data_fine`,
    DROP COLUMN `data_inizio`,
    ADD COLUMN `mese_fine` DATETIME(3) NULL,
    ADD COLUMN `mese_inizio` DATETIME(3) NULL;
