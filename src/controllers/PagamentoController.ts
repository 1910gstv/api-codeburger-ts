import { Request, Response } from 'express';
import { prismaClient } from "../database/prismaClient";

export class PagamentoController{
    public async getAll(request: Request, response:Response){
        try {
            const allPayments = await prismaClient.pagamentos.findMany()
            console.log(allPayments)
            return response.status(200).json(allPayments)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async getById(request: Request, response:Response){
        const { id } = request.params

        try {
            const payment = await prismaClient.pagamentos.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(payment)
        } catch(error) {
            return response.status(500).json(error)
        }
    }

    public async create(request: Request, response: Response){
        const { descricao } = request.body

        try {
            const newPaymentCreated = await prismaClient.pagamentos.create({
                data: {
                    descricao
                }
            });
            return response.status(200).json(newPaymentCreated)      
        } catch (error) {
            return response.status(500).json(error);
        }
    }

    public async edit(request: Request, response: Response){
        const { id } = request.params
        const { descricao  } = request.body

        try {
            const updatePayment = await prismaClient.pagamentos.update({
                where: {
                    id: Number(id)
                },
                data: {
                    descricao
                }
            })
            return response.status(200).json(updatePayment)
        } catch(error) {
            return response.status(500).json({error: error})
        }
    }

    public async delete(request: Request, response: Response) {
        const { id } = request.params

        try {
            await prismaClient.pagamentos.delete({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json({message: `O pagamento ${id} foi deletado`})
        } catch(error) {
            return response.status(500).json(error)
        }
    }
}