/*
  Warnings:

  - Added the required column `calorie` to the `Pianta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carboidrati` to the `Pianta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grassi` to the `Pianta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potassio` to the `Pianta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteine` to the `Pianta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vitamine` to the `Pianta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pianta` ADD COLUMN `calorie` VARCHAR(191) NOT NULL,
    ADD COLUMN `carboidrati` VARCHAR(191) NOT NULL,
    ADD COLUMN `grassi` VARCHAR(191) NOT NULL,
    ADD COLUMN `potassio` VARCHAR(191) NOT NULL,
    ADD COLUMN `proteine` VARCHAR(191) NOT NULL,
    ADD COLUMN `vitamine` VARCHAR(191) NOT NULL;
