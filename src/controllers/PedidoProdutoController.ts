import { Request, Response } from 'express';
import { prismaClient } from "../database/prismaClient";

export class PedidoProdutoController{
    public async getAll(request: Request, response:Response){
        try {
            const allOrders = await prismaClient.pedidosprodutos.findMany()
            return response.status(200).json(allOrders)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async getById(request: Request, response:Response){
        const { id } = request.params

        try {
            const order = await prismaClient.pedidosprodutos.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(order)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async create(request: Request, response: Response){
        const { PedidoId, ProdutoId } = request.body

        try {
            const neworderCreated = await prismaClient.pedidosprodutos.create({
                data: {
                    PedidoId, ProdutoId
                }
            });
            return response.status(200).json(neworderCreated)      
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    public async edit(request: Request, response: Response){
        const { id } = request.params
        const { PedidoId, ProdutoId  } = request.body

        try {
            const updateorder = await prismaClient.pedidosprodutos.update({
                where: {
                    id: Number(id)
                },
                data: {
                    PedidoId, ProdutoId
                }
            })
            return response.status(200).json(updateorder)
        } catch(error) {
            return response.status(500).json({error: error})
        }
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params

        try {
            await prismaClient.pedidosprodutos.delete({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json({message: `O pedido produto ${id} foi deletado`})
        } catch(error) {
            return response.status(500).json(error)
        }
    }
}