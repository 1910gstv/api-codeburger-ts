-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(255) NOT NULL,
    `bairro` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(50) NOT NULL,
    `estado` VARCHAR(2) NOT NULL,
    `cep` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_pedido` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `valor_total` DECIMAL(7, 2) NOT NULL,
    `pagamentos_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    INDEX `id_pagamentos_fk`(`pagamentos_id`),
    INDEX `id_usuariosfk`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedidosprodutos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `PedidoId` INTEGER NULL,
    `ProdutoId` INTEGER NULL,

    INDEX `PedidoId`(`PedidoId`),
    INDEX `ProdutoId`(`ProdutoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(250) NOT NULL,
    `valor` DECIMAL(7, 2) NOT NULL,
    `categorias_id` INTEGER NULL,

    INDEX `fk_id_categoria`(`categorias_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `sobrenome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(40) NOT NULL,
    `endereco_id` INTEGER NOT NULL,

    INDEX `id_endereco`(`endereco_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `foreignkey_id_pagamentos` FOREIGN KEY (`pagamentos_id`) REFERENCES `pagamentos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pedidos` ADD CONSTRAINT `foreignkey_id_usuarios` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pedidosprodutos` ADD CONSTRAINT `foreignkey_pedidos_produtos` FOREIGN KEY (`PedidoId`) REFERENCES `pedidos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pedidosprodutos` ADD CONSTRAINT `foreignkey_produtos_pedidos` FOREIGN KEY (`ProdutoId`) REFERENCES `Produtos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `foreignkey_id_endereco` FOREIGN KEY (`endereco_id`) REFERENCES `enderecos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
