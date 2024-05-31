-- CreateTable
CREATE TABLE `BackupNotifiche` (
    `id_backupnotifica` INTEGER NOT NULL AUTO_INCREMENT,
    `testo` VARCHAR(191) NOT NULL,
    `aperta` BOOLEAN NOT NULL DEFAULT false,
    `id_notifica` INTEGER NOT NULL,

    PRIMARY KEY (`id_backupnotifica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BackupNotifiche` ADD CONSTRAINT `BackupNotifiche_id_notifica_fkey` FOREIGN KEY (`id_notifica`) REFERENCES `Notifiche`(`id_notifica`) ON DELETE CASCADE ON UPDATE CASCADE;
