import { Request, Response } from 'express';
import {  authorizationUser } from '../libs/AuthService';

export const cadastro =async (req: Request, res: Response): Promise<void> => {
  const {nome, email, senha, cidade, estado, telefone, cau, descricao, tipo} = req.body;

  try {
    const uniqueUser = await authorizationUser(email);

    if (!uniqueUser) {
      res.status(401).json({ error: 'Usuario ja cadastrado' });
      return;
    }
    // cadastrar usuario no banco
    console.log(email)
    res.json({ email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }

}