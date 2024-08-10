import { Request, Response } from 'express';
import { prismaClient } from "../database/prismaClient";

export class CategoriaController{
    public async getAll(request: Request, response:Response){
        try {
            const AllCategories = await prismaClient.categorias.findMany()
            return response.status(200).json(AllCategories)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async getById(request: Request, response:Response){
        const { id } = request.params

        try {
            const category = await prismaClient.categorias.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(category)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async create(request: Request, response: Response){
        const { descricao } = request.body

        try {
            const newCategoryCreated = await prismaClient.categorias.create({
                data: {
                    descricao
                }
            });
            return response.status(200).json(newCategoryCreated)      
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    public async edit(request: Request, response: Response){
        const { id } = request.params
        const { descricao } = request.body

        try {
            const updateCategory = await prismaClient.categorias.update({
                where: {
                    id: Number(id)
                },
                data: {
                    descricao,
                }
            })
            return response.status(200).json(updateCategory)
        } catch(error) {
            return response.status(500).json({error: error})
        }
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params

        try {
            const category = await prismaClient.categorias.delete({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json({message: `A categoria ${category.descricao} foi deletada`})
        } catch(error) {
            return response.status(500).json(error)
        }
    }
}