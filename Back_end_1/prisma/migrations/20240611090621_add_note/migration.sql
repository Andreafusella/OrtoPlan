-- CreateTable
CREATE TABLE `Note` (
    `id_note` INTEGER NOT NULL AUTO_INCREMENT,
    `testo` VARCHAR(1000) NOT NULL,
    `id_utente` INTEGER NOT NULL,

    PRIMARY KEY (`id_note`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE CASCADE ON UPDATE CASCADE;
