/*
  Warnings:

  - You are about to drop the `Azioni` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Azioni` DROP FOREIGN KEY `Azioni_id_piantagione_fkey`;

-- DropForeignKey
ALTER TABLE `Azioni` DROP FOREIGN KEY `Azioni_id_utente_fkey`;

-- DropTable
DROP TABLE `Azioni`;

-- CreateTable
CREATE TABLE `Savedata` (
    `id_savedata` INTEGER NOT NULL AUTO_INCREMENT,
    `id_utente` INTEGER NOT NULL,
    `id_piantagione` INTEGER NOT NULL,
    `t_acqua` INTEGER NOT NULL,
    `t_raccolta` INTEGER NOT NULL,

    PRIMARY KEY (`id_savedata`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Savedata` ADD CONSTRAINT `Savedata_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Savedata` ADD CONSTRAINT `Savedata_id_piantagione_fkey` FOREIGN KEY (`id_piantagione`) REFERENCES `Piantagione`(`id_piantagione`) ON DELETE CASCADE ON UPDATE CASCADE;
