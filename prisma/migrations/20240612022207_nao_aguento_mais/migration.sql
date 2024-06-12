/*
  Warnings:

  - You are about to drop the `pedidos_simples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pedidos_simples";

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "nome_usuario" VARCHAR(255) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);
