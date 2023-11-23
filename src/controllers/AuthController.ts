import { Request, Response } from "express";
import { authenticateUser } from "../libs/AuthService";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;

  try {
    const token = await authenticateUser(email, senha);

    if (!token) {
      res.status(401).json({ error: "Email ou senha inválidos" });
      return;
    }

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
