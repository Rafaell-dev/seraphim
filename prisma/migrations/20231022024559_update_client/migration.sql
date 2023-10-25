/*
  Warnings:

  - Added the required column `cli_type` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` ADD COLUMN `cli_type` VARCHAR(255) NOT NULL,
    MODIFY `cli_cnpj` VARCHAR(191) NULL;
