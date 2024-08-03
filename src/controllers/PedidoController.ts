import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { describe } from "node:test";
import { connect } from "node:http2";
import { Decimal } from "@prisma/client/runtime/library";

export class PedidoController {
  public async getAll(request: Request, response: Response) {
    const { usuario_id } = request.body;

    try {
      const allOrders = await prismaClient.pedidos.findMany({
        where: {
          usuario_id,
        },
      });
      return response.status(200).json(allOrders);
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

  // public async create(request: Request, response: Response){
  //     const { descricao, nome_usuario } = request.body

  //     try {
  //         const neworderCreated = await prismaClient.pedidos.create({
  //             data: {
  //                 descricao, nome_usuario
  //             }
  //         });
  //         return response.status(200).json(neworderCreated)
  //     } catch (error) {
  //         return response.status(500).json(error);
  //     }
  // }

  public async create(request: Request, response: Response) {
    try {
      let { produtos, pagamentos_id, usuario_id } = request.body;

      console.log("Produtos: ", produtos);
      let p_id = Promise.all(
        produtos.map(async (p: any) => {
          let result = await prismaClient.produtos.findUnique({
            where: {
              id: p.id,
            },
          });

          console.log("Resultado: ", result);
          return result;
        })
      );

      const productsSolved = await p_id;

      console.log("Produtos Solved: ", productsSolved);

      let sum: number = 0;
      productsSolved.forEach((p) => (sum += Number(p.valor)));

      console.log("Soma produtos: " + sum);

      let createNewOrder = await prismaClient.pedidos.create({
        data: {
          valor_total: sum,
          pagamentos_id,
          usuario_id,
        },
      });

      console.log("Pedido Criado", createNewOrder);

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
        console.log(newOrderItem);
        return newOrderItem;
      });

      return response.status(200).json("Ok");
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
