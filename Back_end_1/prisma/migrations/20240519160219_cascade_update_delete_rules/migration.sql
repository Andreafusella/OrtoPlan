-- DropForeignKey
ALTER TABLE `Credenziali` DROP FOREIGN KEY `Credenziali_id_utente_fkey`;

-- DropForeignKey
ALTER TABLE `Piantagione` DROP FOREIGN KEY `Piantagione_id_pianta_fkey`;

-- DropForeignKey
ALTER TABLE `Piantagione` DROP FOREIGN KEY `Piantagione_id_utente_fkey`;

-- AddForeignKey
ALTER TABLE `Credenziali` ADD CONSTRAINT `Credenziali_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piantagione` ADD CONSTRAINT `Piantagione_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piantagione` ADD CONSTRAINT `Piantagione_id_pianta_fkey` FOREIGN KEY (`id_pianta`) REFERENCES `Pianta`(`id_pianta`) ON DELETE CASCADE ON UPDATE CASCADE;
