-- CreateTable
CREATE TABLE `NotificheEliminate` (
    `id_notificaeliminata` INTEGER NOT NULL AUTO_INCREMENT,
    `id_utente` INTEGER NOT NULL,
    `id_piantagione` INTEGER NOT NULL,
    `tipo` INTEGER NOT NULL,
    `data_invio` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_notificaeliminata`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
