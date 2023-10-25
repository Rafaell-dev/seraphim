-- AlterTable
ALTER TABLE `clients` MODIFY `cli_city` VARCHAR(255) NULL,
    MODIFY `cli_state` VARCHAR(255) NULL,
    MODIFY `cli_zipcode` VARCHAR(255) NULL,
    MODIFY `cli_country` INTEGER NULL,
    MODIFY `cli_number` VARCHAR(255) NULL,
    MODIFY `cli_district` VARCHAR(255) NULL,
    MODIFY `cli_ibge` VARCHAR(255) NULL,
    MODIFY `cli_street` VARCHAR(255) NULL;
