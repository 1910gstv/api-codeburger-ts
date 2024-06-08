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
}