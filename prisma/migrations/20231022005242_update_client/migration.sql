/*
  Warnings:

  - You are about to drop the column `cli_address` on the `clients` table. All the data in the column will be lost.
  - You are about to alter the column `cli_country` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Added the required column `cli_district` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cli_fantasia` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cli_ibge` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cli_razao` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cli_street` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `cli_address`,
    ADD COLUMN `cli_district` VARCHAR(255) NOT NULL,
    ADD COLUMN `cli_fantasia` VARCHAR(255) NOT NULL,
    ADD COLUMN `cli_ibge` VARCHAR(255) NOT NULL,
    ADD COLUMN `cli_razao` VARCHAR(255) NOT NULL,
    ADD COLUMN `cli_street` VARCHAR(255) NOT NULL,
    MODIFY `cli_country` INTEGER NOT NULL;
