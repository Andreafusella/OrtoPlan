/*
  Warnings:

  - You are about to drop the `Annaffiature` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `citta` to the `Piantagione` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Annaffiature` DROP FOREIGN KEY `Annaffiature_id_piantagione_fkey`;

-- DropForeignKey
ALTER TABLE `Annaffiature` DROP FOREIGN KEY `Annaffiature_id_utente_fkey`;

-- AlterTable
ALTER TABLE `Piantagione` ADD COLUMN `citta` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Annaffiature`;
