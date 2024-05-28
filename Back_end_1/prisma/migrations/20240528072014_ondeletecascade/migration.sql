-- DropForeignKey
ALTER TABLE `Notifiche` DROP FOREIGN KEY `Notifiche_id_piantagione_fkey`;

-- DropForeignKey
ALTER TABLE `Notifiche` DROP FOREIGN KEY `Notifiche_id_utente_fkey`;

-- AddForeignKey
ALTER TABLE `Notifiche` ADD CONSTRAINT `Notifiche_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifiche` ADD CONSTRAINT `Notifiche_id_piantagione_fkey` FOREIGN KEY (`id_piantagione`) REFERENCES `Piantagione`(`id_piantagione`) ON DELETE CASCADE ON UPDATE CASCADE;
