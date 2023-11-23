import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import prismadb from "../libs/prismadb";

export const cadastro = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, senha, cidade, estado, telefone, cau, descricao, tipo } =
    req.body;

  try {
    if (!validator.isEmail(email)) {
      res.status(400).json({ erro: "E-mail inválido." });
      return;
    }

    if (senha.length < 6) {
      res.status(400).json({
        erro: "Senha muito curta. Deve ter pelo menos 6 caracteres.",
      });
      return;
    }

    const uniqueUser = await prismadb.usuario.findUnique({
      where: { email },
    });

    if (uniqueUser) {
      res.status(401).json({ erro: "Email já está em uso." });
      return;
    }

    const saltRounds = 10;
    const senhaCodificada = await bcrypt.hash(senha, saltRounds);

    const newUser = await prismadb.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCodificada,
        cidade,
        estado,
        telefone,
        cau,
        descricao,
        tipo,
      },
    });

    res
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso", usuario: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};
