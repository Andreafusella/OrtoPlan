/*
  Warnings:

  - You are about to drop the `BackupNotifiche` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BackupNotifiche` DROP FOREIGN KEY `BackupNotifiche_id_notifica_fkey`;

-- DropTable
DROP TABLE `BackupNotifiche`;
