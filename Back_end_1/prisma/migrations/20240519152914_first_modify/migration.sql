-- CreateTable
CREATE TABLE `Utente` (
    `id_utente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cognome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_utente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credenziali` (
    `id_utente` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Credenziali_email_key`(`email`),
    PRIMARY KEY (`id_utente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Piantagione` (
    `id_piantagione` INTEGER NOT NULL AUTO_INCREMENT,
    `id_utente` INTEGER NOT NULL,
    `n_slot` INTEGER NOT NULL,
    `data_inizio` DATETIME(3) NOT NULL,
    `id_pianta` INTEGER NOT NULL,

    PRIMARY KEY (`id_piantagione`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pianta` (
    `id_pianta` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `t_raccolta` INTEGER NOT NULL,
    `t_acqua` INTEGER NOT NULL,

    PRIMARY KEY (`id_pianta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Credenziali` ADD CONSTRAINT `Credenziali_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piantagione` ADD CONSTRAINT `Piantagione_id_utente_fkey` FOREIGN KEY (`id_utente`) REFERENCES `Utente`(`id_utente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piantagione` ADD CONSTRAINT `Piantagione_id_pianta_fkey` FOREIGN KEY (`id_pianta`) REFERENCES `Pianta`(`id_pianta`) ON DELETE RESTRICT ON UPDATE CASCADE;
