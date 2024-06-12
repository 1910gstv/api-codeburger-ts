/*
  Warnings:

  - You are about to drop the `pedidos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pedidosprodutos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "foreignkey_id_pagamentos";

-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "foreignkey_id_usuarios";

-- DropForeignKey
ALTER TABLE "pedidosprodutos" DROP CONSTRAINT "foreignkey_pedidos_produtos";

-- DropForeignKey
ALTER TABLE "pedidosprodutos" DROP CONSTRAINT "foreignkey_produtos_pedidos";

-- DropTable
DROP TABLE "pedidos";

-- DropTable
DROP TABLE "pedidosprodutos";
