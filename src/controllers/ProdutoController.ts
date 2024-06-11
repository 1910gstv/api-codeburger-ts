import { Request, Response } from 'express';
import { prismaClient } from "../database/prismaClient";

export class ProdutoController{
    public async getAll(request: Request, response:Response){
        try {
            const allProducts = await prismaClient.produtos.findMany()
            return response.status(200).json(allProducts)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async getById(request: Request, response:Response){
        const { id } = request.params

        try {
            const Product = await prismaClient.produtos.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(Product)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async create(request: Request, response: Response){
        const { nome, descricao, valor, categorias_id } = request.body

        try {
            const newProductCreated = await prismaClient.produtos.create({
                data: {
                    nome, descricao, valor, categorias_id
                }
            });
            return response.status(200).json(newProductCreated)      
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    public async edit(request: Request, response: Response){
        const { id } = request.params
        const { nome, descricao, valor, categorias_id  } = request.body

        try {
            const updateProduct = await prismaClient.produtos.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome, descricao, valor, categorias_id
                }
            })
            return response.status(200).json(updateProduct)
        } catch(error) {
            return response.status(500).json({error: error})
        }
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params

        try {
            await prismaClient.produtos.delete({
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