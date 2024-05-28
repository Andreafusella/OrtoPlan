/*
  Warnings:

  - You are about to drop the `Savedata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Savedata` DROP FOREIGN KEY `Savedata_id_piantagione_fkey`;

-- DropForeignKey
ALTER TABLE `Savedata` DROP FOREIGN KEY `Savedata_id_utente_fkey`;

-- DropTable
DROP TABLE `Savedata`;

-- CreateTable
CREATE TABLE `Annaffiature` (
    `id_annaffiatura` INTEGER NOT NULL AUTO_INCREMENT,
    `id_utente` INTEGER NOT NULL,
    `id_piantagione` INTEGER NOT NULL,
    `giorni_rimanenti` INTEGER NOT NULL,
    `data_save` DATETIME(3) NOT NULL,

    INDEX `Annaffiature_id_utente_id_piantagione_data_save_idx`(`id_utente`, `id_piantagione`, `data_save`),
    PRIMARY KEY (`id_annaffiatura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Annaffiature` ADD CONSTRAINT `Annaffiature_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Annaffiature` ADD CONSTRAINT `Annaffiature_id_piantagione_fkey` FOREIGN KEY (`id_piantagione`) REFERENCES `Piantagione`(`id_piantagione`) ON DELETE CASCADE ON UPDATE CASCADE;
