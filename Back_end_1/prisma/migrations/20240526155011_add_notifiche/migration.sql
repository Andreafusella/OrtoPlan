-- CreateTable
CREATE TABLE `Notifiche` (
    `id_notifica` INTEGER NOT NULL AUTO_INCREMENT,
    `testo` VARCHAR(191) NOT NULL,
    `aperta` BOOLEAN NOT NULL,
    `id_utente` INTEGER NOT NULL,

    PRIMARY KEY (`id_notifica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notifiche` ADD CONSTRAINT `Notifiche_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE RESTRICT ON UPDATE CASCADE;
