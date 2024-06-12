-- CreateTable
CREATE TABLE "pedidos_simples" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "nome_usuario" VARCHAR(255) NOT NULL,

    CONSTRAINT "pedidos_simples_pkey" PRIMARY KEY ("id")
);
