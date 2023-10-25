-- CreateTable
CREATE TABLE `clients` (
    `cli_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cli_cpf` INTEGER NOT NULL,
    `cli_cnpj` INTEGER NOT NULL,
    `cli_name` VARCHAR(255) NOT NULL,
    `cli_email` VARCHAR(191) NOT NULL,
    `cli_password` VARCHAR(255) NOT NULL,
    `cli_phone` VARCHAR(255) NOT NULL,
    `cli_address` VARCHAR(255) NOT NULL,
    `cli_city` VARCHAR(255) NOT NULL,
    `cli_state` VARCHAR(255) NOT NULL,
    `cli_zipcode` VARCHAR(255) NOT NULL,
    `cli_country` VARCHAR(255) NOT NULL,
    `cli_number` VARCHAR(255) NOT NULL,
    `cli_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cli_updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clients_cli_cpf_key`(`cli_cpf`),
    UNIQUE INDEX `clients_cli_cnpj_key`(`cli_cnpj`),
    UNIQUE INDEX `clients_cli_email_key`(`cli_email`),
    PRIMARY KEY (`cli_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `tra_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tra_client_id` INTEGER NOT NULL,
    `tra_services_id` INTEGER NOT NULL,
    `tra_status` VARCHAR(255) NOT NULL,
    `tra_total_value` DOUBLE NOT NULL,
    `tra_payment` INTEGER NOT NULL,
    `tra_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tra_updatedAt` DATETIME(3) NOT NULL,

    INDEX `client_tra_client_id_fkey`(`tra_client_id`),
    INDEX `service_tra_services_id_fkey`(`tra_services_id`),
    PRIMARY KEY (`tra_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `ser_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ser_name` VARCHAR(255) NOT NULL,
    `ser_description` VARCHAR(255) NOT NULL,
    `ser_value` DOUBLE NOT NULL,
    `ser_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ser_updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ser_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_items` (
    `t_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `t_item_tra_id` INTEGER NOT NULL,
    `t_item_ser_id` INTEGER NOT NULL,
    `t_item_value` DOUBLE NOT NULL,
    `t_item_discount` DOUBLE NOT NULL,
    `t_item_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `t_item_updatedAt` DATETIME(3) NOT NULL,

    INDEX `transaction_t_item_tra_id_fkey`(`t_item_tra_id`),
    INDEX `service_t_item_ser_id_fkey`(`t_item_ser_id`),
    PRIMARY KEY (`t_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_tra_client_id_fkey` FOREIGN KEY (`tra_client_id`) REFERENCES `clients`(`cli_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_tra_services_id_fkey` FOREIGN KEY (`tra_services_id`) REFERENCES `services`(`ser_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_items` ADD CONSTRAINT `T_items_t_item_tra_id_fkey` FOREIGN KEY (`t_item_tra_id`) REFERENCES `transactions`(`tra_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_items` ADD CONSTRAINT `T_items_t_item_ser_id_fkey` FOREIGN KEY (`t_item_ser_id`) REFERENCES `services`(`ser_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
