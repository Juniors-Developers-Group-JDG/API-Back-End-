// se o usuário não estiver logado, página de login
// se o usuário estiver logado, página de cadastro de projeto
// preencher "nome", "descricao" e "arquivo", "id" preenchido automaticamente com o id do usuário logado

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cadastrarProjeto = async (req: Request, res: Response): Promise<void> => {
  const { nome, descricao, arquivo } = req.body;

  // Verificar se o usuário está autenticado
  const userId = req.user.id; // Supondo que você tenha um middleware que adiciona o usuário ao request (req.user)

  try {
    // Criar o projeto associado ao usuário logado
    const novoProjeto = await prisma.projeto.create({
      data: {
        nome,
        descricao,
        arquivo,
        usuario: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({ projeto: novoProjeto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar o projeto." });
  }
};
