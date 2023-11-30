// se o usuário não estiver logado, página de login
// se o usuário estiver logado, página de cadastro de projeto
// preencher "nome", "descricao" e "arquivo", "id" preenchido automaticamente com o id do usuário logado

import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prismadb from "../libs/prismadb";

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const { nome, descricao, arquivo } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ erro: "Token não fornecido." });
    return;
  }

  let userIdByToken: { userId: number } | undefined;

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ erro: "Token inválido." });
      return;
    }
    userIdByToken = decoded as { userId: number };
  });

  const user = await prismadb.usuario.findUnique({
    where: {
      id: userIdByToken?.userId,
    },
  });

  if (!user) {
    res.status(400).json({ erro: "Usuário não encontrado." });
    return;
  }

  try {
    const novoProjeto = await prisma.projeto.create({
      data: {
        nome,
        descricao,
        arquivo,
        usuario: {
          connect: { id: user.id },
        },
      },
    });

    res.status(201).json({ projeto: novoProjeto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar o projeto." });
  }
};
