import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prismadb from "../libs/prismadb";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

    const {
      nome,
      email,
      senha,
      cidade,
      estado,
      telefone,
      cau,
      descricao,
      tipo,
    } = req.body;

    if (
      !(
        nome ||
        cidade ||
        estado ||
        telefone ||
        cau ||
        descricao ||
        tipo ||
        senha
      )
    ) {
      res.status(400).json({ erro: "Nenhum dado fornecido para atualização." });
      return;
    }

    if (email) {
      res.status(400).json({ erro: "Atualização de e-mail não permitida." });
      return;
    }

    const restrictedFields = ["telefone", "cau", "tipo"];
    const isAdmin = user.tipo === "ADMIN";

    for (const field of restrictedFields) {
      if (req.body[field] && !isAdmin) {
        res
          .status(403)
          .json({ erro: `Somente administradores podem alterar o ${field}.` });
        return;
      }
    }

    const updateData: { [key: string]: string | undefined } = {
      ...(nome && { nome }),
      ...(cidade && { cidade }),
      ...(estado && { estado }),
      ...(descricao && { descricao }),
      ...(isAdmin && telefone && { telefone }),
      ...(isAdmin && cau && { cau }),
      ...(isAdmin && email && { email }),
      ...(isAdmin && tipo && { tipo }),
    };

    if (senha) {
      if (senha.length < 6) {
        res.status(400).json({
          erro: "Senha muito curta. Deve ter pelo menos 6 caracteres.",
        });
        return;
      }
      updateData.senha = await bcrypt.hash(senha, 10);
    }

    const updatedUser = await prismadb.usuario.update({
      where: { id: user.id },
      data: updateData,
    });

    res
      .status(200)
      .json({ mensagem: "Usuário atualizado com sucesso.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ erro: "Erro no servidor." });
  }
};
