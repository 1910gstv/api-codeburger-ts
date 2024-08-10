import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class PedidoProdutoController {
  public async getAll(request: Request, response: Response) {
    try {
      const allOrders = await prismaClient.pedidosprodutos.findMany();

      const finalOrder = allOrders.map((p) => {
        return {
          pedido: {
            id: p.id,
            pedido_id: p.PedidoId,
            produto_id: p.ProdutoId,
            links: [
              {
                href: `http://localhost:4000/orders-item/${p.id}`,
                rel: "self",
                type: "GET",
              },
              {
                href: `http://localhost:4000/orders-item/${p.id}`,
                rel: "edit",
                type: "PUT",
              },
              {
                href: `http://localhost:4000/orders-item/${p.id}`,
                rel: "delete",
                type: "DELETE",
              },
            ],
          },
        };
      });

      return response.status(200).json(finalOrder);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const order = await prismaClient.pedidosprodutos.findUnique({
        where: {
          id: Number(id),
        },
      });

      const finalOrder = {
        id: order?.id,
        pedido_id: order?.PedidoId,
        produto_id: order?.ProdutoId,
        links: [
          {
            href: `http://localhost:4000/orders-item/${order?.id}`,
            rel: "self",
            type: "GET",
          },
          {
            href: `http://localhost:4000/orders-item/${order?.id}`,
            rel: "edit",
            type: "PUT",
          },
          {
            href: `http://localhost:4000/orders-item/${order?.id}`,
            rel: "delete",
            type: "DELETE",
          },
        ],
      };
      return response.status(200).json({ pedido: finalOrder });
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async create(request: Request, response: Response) {
    const { PedidoId, ProdutoId } = request.body;

    try {
      const neworderCreated = await prismaClient.pedidosprodutos.create({
        data: {
          PedidoId,
          ProdutoId,
        },
      });
      return response.status(200).json(neworderCreated);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async edit(request: Request, response: Response) {
    const { id } = request.params;
    const { PedidoId, ProdutoId } = request.body;

    try {
      const updateorder = await prismaClient.pedidosprodutos.update({
        where: {
          id: Number(id),
        },
        data: {
          PedidoId,
          ProdutoId,
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
      await prismaClient.pedidosprodutos.delete({
        where: {
          id: Number(id),
        },
      });
      return response
        .status(200)
        .json({ message: `O pedido produto ${id} foi deletado` });
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}
