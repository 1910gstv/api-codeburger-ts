import { Request, Response } from 'express';
import { prismaClient } from "../database/prismaClient";

export class EnderecoController{
    public async getAll(request: Request, response:Response){
        try {
            const allAddresses = await prismaClient.enderecos.findMany()
            return response.status(200).json(allAddresses)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async getById(request: Request, response:Response){
        const { id } = request.params

        try {
            const address = await prismaClient.enderecos.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(address)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async create(request: Request, response: Response){
        const { logradouro, bairro, cidade, estado, cep } = request.body

        try {
            const newAddressCreated = await prismaClient.enderecos.create({
                data: {
                    logradouro, bairro, cidade, estado, cep
                }
            });
            return response.status(200).json(newAddressCreated)      
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    public async edit(request: Request, response: Response){
        const { id } = request.params
        const { logradouro, bairro, cidade, estado, cep  } = request.body

        try {
            const updateAddress = await prismaClient.enderecos.update({
                where: {
                    id: Number(id)
                },
                data: {
                    logradouro,
                    bairro,
                    cidade,
                    estado,
                    cep 
                }
            })
            return response.status(200).json(updateAddress)
        } catch(error) {
            return response.status(500).json({error: error})
        }
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params

        try {
            await prismaClient.enderecos.delete({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json({message: `O endereco ${id} foi deletada`})
        } catch(error) {
            return response.status(500).json(error)
        }
    }
}