import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class UsuarioController {
  public async getAll(request: Request, response: Response) {
    try {
      const allUsers = await prismaClient.usuarios.findMany();
      return response.status(200).json(allUsers);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async getById(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await prismaClient.usuarios.findUnique({
        where: {
          id: Number(id),
        },
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async create(request: Request, response: Response) {
    const { nome, sobrenome, email, senha, endereco_id } = request.body;

    try {
      const newUserCreated = await prismaClient.usuarios.create({
        data: {
            nome, sobrenome, email, senha, endereco_id
        },
      });
      return response.status(200).json(newUserCreated);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async edit(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, sobrenome, email, senha, endereco_id } = request.body;

    try {
      const updateuser = await prismaClient.usuarios.update({
        where: {
          id: Number(id),
        },
        data: {
          nome,
          sobrenome,
          email,
          senha,
          endereco_id,
        },
      });
      return response.status(200).json(updateuser);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prismaClient.usuarios.delete({
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
