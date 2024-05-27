/*
  Warnings:

  - Added the required column `id_piantagione` to the `Notifiche` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notifiche` ADD COLUMN `id_piantagione` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Notifiche` ADD CONSTRAINT `Notifiche_id_piantagione_fkey` FOREIGN KEY (`id_piantagione`) REFERENCES `Piantagione`(`id_piantagione`) ON DELETE RESTRICT ON UPDATE CASCADE;
