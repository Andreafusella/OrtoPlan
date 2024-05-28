-- CreateTable
CREATE TABLE `Azioni` (
    `id_azione` INTEGER NOT NULL AUTO_INCREMENT,
    `id_utente` INTEGER NOT NULL,
    `id_piantagione` INTEGER NOT NULL,

    PRIMARY KEY (`id_azione`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Azioni` ADD CONSTRAINT `Azioni_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Azioni` ADD CONSTRAINT `Azioni_id_piantagione_fkey` FOREIGN KEY (`id_piantagione`) REFERENCES `Piantagione`(`id_piantagione`) ON DELETE CASCADE ON UPDATE CASCADE;
