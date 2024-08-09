import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { describe } from "node:test";
import { connect } from "node:http2";
import { Decimal } from "@prisma/client/runtime/library";
import { serialize } from "node:v8";
import { equal } from "node:assert";

export class PedidoController {
  public async getAll(request: Request, response: Response) {
    var { usuario_id } = request.params;

    try {
      const allOrders = await prismaClient.pedidos.findMany({
        include: {
          pedidosprodutos: {
            select: {
              produtos: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
      });

      const fetched = allOrders.map((e) => {
        return {
          pedido: {
            id: e.id,
            usuario: e.usuario_id,
            tipo_pagamento: e.pagamentos_id,
            data_pedido: e.data_pedido,
            produtos: e.pedidosprodutos,
            valor_total: e.valor_total,
          },
        };
      });

      return response.status(200).json(fetched);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const order = await prismaClient.pedidos.findUnique({
        where: {
          id: Number(id),
        },
      });
      return response.status(200).json(order);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async create(request: Request, response: Response) {
    try {
      let { produtos, pagamentos_id, usuario_id } = request.body;

      let getProducts = Promise.all(
        produtos.map(async (p: any) => {
          let result = await prismaClient.produtos.findUnique({
            where: {
              id: p.id,
            },
          });
          return result;
        })
      );

      const productsSolved = await getProducts;

      let sum: number = 0;
      productsSolved.forEach((p) => (sum += Number(p.valor)));

      let createNewOrder = await prismaClient.pedidos.create({
        data: {
          valor_total: sum,
          pagamentos_id,
          usuario_id,
        },
      });

      if (!createNewOrder) {
        return response.status(400).json({ msg: "O pedido não foi criado" });
      }

      let OrderCreatedId = createNewOrder.id;

      productsSolved.forEach(async (p) => {
        var newOrderItem = await prismaClient.pedidosprodutos.create({
          data: {
            PedidoId: OrderCreatedId,
            ProdutoId: p.id,
          },
        });
        return newOrderItem;
      });

      const novo_pedido = {
        id: createNewOrder.id,
        usuario: createNewOrder.usuario_id,
        pagamento: createNewOrder.pagamentos_id,
        data: createNewOrder.data_pedido,
        valor_total: createNewOrder.valor_total,
        produtos: productsSolved,
      };

      return response.status(201).json({
        novo_pedido,
      });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async edit(request: Request, response: Response) {
    const { id } = request.params;
    const { data_pedido, valor_total, pagamentos_id, usuario_id } =
      request.body;

    try {
      const updateorder = await prismaClient.pedidos.update({
        where: {
          id: Number(id),
        },
        data: {
          data_pedido,
          valor_total,
          pagamentos_id,
          usuario_id,
        },
      });
      return response.status(200).json(updateorder);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prismaClient.pedidos.delete({
        where: {
          id: Number(id),
        },
      });
      return response
        .status(200)
        .json({ message: `O pedido ${id} foi deletado` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
