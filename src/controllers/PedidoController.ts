import { Request, Response } from 'express';
import { prismaClient } from "../database/prismaClient";

export class PedidoController{
    public async getAll(request: Request, response:Response){
        const { nome_usuario } = request.body

        try {
            const allOrders = await prismaClient.pedidos_simples.findMany({
                where: {
                    nome_usuario
                }
            })
            return response.status(200).json(allOrders)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async getById(request: Request, response:Response){
        const { id } = request.params

        try {
            const order = await prismaClient.pedidos_simples.findUnique({
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
        const { descricao, nome_usuario } = request.body

        try {
            const neworderCreated = await prismaClient.pedidos_simples.create({
                data: {
                    descricao, nome_usuario
                }
            });
            return response.status(200).json(neworderCreated)      
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    public async edit(request: Request, response: Response){
        const { id } = request.params
        const { descricao, nome_usuario  } = request.body

        try {
            const updateorder = await prismaClient.pedidos_simples.update({
                where: {
                    id: Number(id)
                },
                data: {
                    descricao, nome_usuario
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
            await prismaClient.pedidos_simples.delete({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json({message: `O pedido ${id} foi deletado`})
        } catch(error) {
            return response.status(500).json(error)
        }
    }
}