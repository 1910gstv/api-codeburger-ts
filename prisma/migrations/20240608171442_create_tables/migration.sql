-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255),

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "bairro" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "cep" INTEGER NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "data_pedido" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DECIMAL(7,2) NOT NULL,
    "pagamentos_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidosprodutos" (
    "id" SERIAL NOT NULL,
    "PedidoId" INTEGER,
    "ProdutoId" INTEGER,

    CONSTRAINT "pedidosprodutos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(250) NOT NULL,
    "valor" DECIMAL(7,2) NOT NULL,
    "categorias_id" INTEGER,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(40) NOT NULL,
    "endereco_id" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "id_pagamentos_fk" ON "pedidos"("pagamentos_id");

-- CreateIndex
CREATE INDEX "id_usuariosfk" ON "pedidos"("usuario_id");

-- CreateIndex
CREATE INDEX "PedidoId" ON "pedidosprodutos"("PedidoId");

-- CreateIndex
CREATE INDEX "ProdutoId" ON "pedidosprodutos"("ProdutoId");

-- CreateIndex
CREATE INDEX "fk_id_categoria" ON "produtos"("categorias_id");

-- CreateIndex
CREATE INDEX "id_endereco" ON "usuarios"("endereco_id");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "foreignkey_id_pagamentos" FOREIGN KEY ("pagamentos_id") REFERENCES "pagamentos"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "foreignkey_id_usuarios" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "pedidosprodutos" ADD CONSTRAINT "foreignkey_pedidos_produtos" FOREIGN KEY ("PedidoId") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "pedidosprodutos" ADD CONSTRAINT "foreignkey_produtos_pedidos" FOREIGN KEY ("ProdutoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "foreignkey_id_categoria" FOREIGN KEY ("categorias_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "foreignkey_id_endereco" FOREIGN KEY ("endereco_id") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
