import { Router } from "express";
import { createProject } from "../controllers/CreateProjectController";


/**
 * @swagger
 * components:
 *   schemas:
 *     Projeto:
 *       type: object
 *       required:
 *         - nome
 *         - usuarioId
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID gerado automaticamente do projeto
 *         nome:
 *           type: string
 *           description: Nome do projeto
 *         descricao:
 *           type: string
 *           description: Descrição do projeto
 *         arquivo:
 *           type: string
 *           description: Nome do arquivo relacionado ao projeto
 *         usuarioId:
 *           type: integer
 *           format: int64
 *           description: ID do usuário associado ao projeto
 *       example:
 *         id: 1
 *         nome: Projeto Arquitetônico Residencial
 *         descricao: Projeto para uma casa moderna
 *         arquivo: planta_residencial.pdf
 *         usuarioId: 2
 */


const router = Router();

router.post("/novo", createProject);

export default router;


/**
 * @swagger
 * /novo:
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projetos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do projeto
 *               descricao:
 *                 type: string
 *                 description: Descrição do projeto
 *               arquivo:
 *                 type: string
 *                 description: Nome do arquivo relacionado ao projeto
 *             example:
 *               nome: Projeto Arquitetônico Residencial
 *               descricao: Projeto para uma casa moderna
 *               arquivo: planta_residencial.pdf
 *     responses:
 *       201:
 *         description: Projeto cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projeto:
 *                   $ref: '#/components/schemas/Projeto'
 *       400:
 *         description: Erro nos parâmetros da requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   description: Descrição do erro
 *       401:
 *         description: Token não fornecido ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   description: Descrição do erro
 *       403:
 *         description: Usuário não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   description: Descrição do erro
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   description: Descrição do erro
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   description: Descrição do erro
 */
