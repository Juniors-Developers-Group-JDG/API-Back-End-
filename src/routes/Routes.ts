import { Router } from "express";
import { signIn } from "../controllers/SignInController";
import { login } from "../controllers/AuthController";
import { forgotPassword } from "../controllers/ForgotPasswordController";
import { resetPassword } from "../controllers/ForgotPasswordController";
import { changePassword } from "../controllers/ForgotPasswordController";
import { updateUser } from "../controllers/UserController";

const router = Router();



/**
 * @swagger
 * tags:
 *   name: API
 *   description: Endpoints relacionados à autenticação de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *         - tipo
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID gerado automaticamente do usuário
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *         cidade:
 *           type: string
 *           description: Cidade do usuário
 *         estado:
 *           type: string
 *           enum:
 *             - AC
 *             - AL
 *             - AP
 *             - AM
 *             - BA
 *             - CE
 *             - DF
 *             - ES
 *             - GO
 *             - MA
 *             - MT
 *             - MS
 *             - MG
 *             - PA
 *             - PB
 *             - PR
 *             - PE
 *             - PI
 *             - RJ
 *             - RN
 *             - RS
 *             - RO
 *             - RR
 *             - SC
 *             - SP
 *             - SE
 *             - TO
 *           description: Estado do usuário
 *         telefone:
 *           type: string
 *           description: Número de telefone do usuário
 *         cau:
 *           type: string
 *           description: Número do CAU (Conselho de Arquitetura e Urbanismo) do usuário
 *         descricao:
 *           type: string
 *           description: Descrição do usuário
 *         tipo:
 *           type: string
 *           enum:
 *             - ADMIN
 *             - USER
 *           description: Tipo do usuário (ADMIN ou USER)
 *       example:
 *         id: 1
 *         nome: João Silva
 *         email: joao.silva@example.com
 *         senha: senha_criptografada
 *         cidade: São Paulo
 *         estado: SP
 *         telefone: (11) 98765-4321
 *         cau: 12345
 *         descricao: Arquiteto especializado em design de interiores
 *         tipo: USER
 */



router.post("/cadastro", signIn);
router.post("/login", login);
router.post("/recoverpassword", forgotPassword);
router.get("/resetpassword/:id/:token", resetPassword);
router.post("/resetpassword/:id/:token", changePassword);

router.patch("/user", updateUser);

export default router;


/**
 * @swagger
 * /cadastro:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *               senha:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *               cidade:
 *                 type: string
 *                 description: Cidade do usuário
 *               estado:
 *                 type: string
 *                 enum:
 *                   - AC
 *                   - AL
 *                   - AP
 *                   - AM
 *                   - BA
 *                   - CE
 *                   - DF
 *                   - ES
 *                   - GO
 *                   - MA
 *                   - MT
 *                   - MS
 *                   - MG
 *                   - PA
 *                   - PB
 *                   - PR
 *                   - PE
 *                   - PI
 *                   - RJ
 *                   - RN
 *                   - RS
 *                   - RO
 *                   - RR
 *                   - SC
 *                   - SP
 *                   - SE
 *                   - TO
 *                 description: Estado do usuário
 *               telefone:
 *                 type: string
 *                 description: Número de telefone do usuário
 *               cau:
 *                 type: string
 *                 description: Número do CAU (Conselho de Arquitetura e Urbanismo) do usuário
 *               descricao:
 *                 type: string
 *                 description: Descrição do usuário
 *               tipo:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - USER
 *                 description: Tipo do usuário (ADMIN ou USER)
 *             example:
 *               nome: João Silva
 *               email: joao.silva@example.com
 *               senha: senha_segura
 *               cidade: São Paulo
 *               estado: SP
 *               telefone: (11) 98765-4321
 *               cau: 12345
 *               descricao: Arquiteto especializado em design de interiores
 *               tipo: USER
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
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
 *         description: Email já está em uso
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *               senha:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *             example:
 *               email: joao.silva@example.com
 *               senha: senha_segura
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação do usuário
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 */


/**
 * @swagger
 * /recoverpassword:
 *   post:
 *     summary: Envia um e-mail para recuperar a senha do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *             example:
 *               email: joao.silva@example.com
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       404:
 *         description: E-mail não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descrição do erro
 *       500:
 *         description: Erro no envio da mensagem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descrição do erro
 */

/**
 * @swagger
 * /resetpassword/{id}/{token}:
 *   get:
 *     summary: Redireciona para a página de redefinição de senha
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de redefinição de senha
 *     responses:
 *       200:
 *         description: Página de redefinição de senha
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descrição do erro
 *       404:
 *         description: ID de usuário inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descrição do erro
 */

/**
 * @swagger
 * /resetpassword/{id}/{token}:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de redefinição de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nova senha do usuário
 *               password2:
 *                 type: string
 *                 format: password
 *                 description: Confirmação da nova senha do usuário
 *             example:
 *               password: nova_senha_segura
 *               password2: nova_senha_segura
 *     responses:
 *       302:
 *         description: Redireciona para a página de login após a redefinição de senha
 *       400:
 *         description: Senhas não coincidem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descrição do erro
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descrição do erro
 *       404:
 *         description: ID de usuário inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descrição do erro
 */


/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Atualiza os dados do usuário
 *     tags: [Usuários]
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
 *                 description: Novo nome do usuário
 *               cidade:
 *                 type: string
 *                 description: Nova cidade do usuário
 *               estado:
 *                 type: string
 *                 enum:
 *                   - AC
 *                   - AL
 *                   - AP
 *                   - AM
 *                   - BA
 *                   - CE
 *                   - DF
 *                   - ES
 *                   - GO
 *                   - MA
 *                   - MT
 *                   - MS
 *                   - MG
 *                   - PA
 *                   - PB
 *                   - PR
 *                   - PE
 *                   - PI
 *                   - RJ
 *                   - RN
 *                   - RS
 *                   - RO
 *                   - RR
 *                   - SC
 *                   - SP
 *                   - SE
 *                   - TO
 *                 description: Novo estado do usuário
 *               telefone:
 *                 type: string
 *                 description: Novo número de telefone do usuário (somente para administradores)
 *               cau:
 *                 type: string
 *                 description: Novo número do CAU (Conselho de Arquitetura e Urbanismo) do usuário (somente para administradores)
 *               descricao:
 *                 type: string
 *                 description: Nova descrição do usuário
 *               senha:
 *                 type: string
 *                 format: password
 *                 description: Nova senha do usuário (deve ter pelo menos 6 caracteres)
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                 user:
 *                   $ref: '#/components/schemas/Usuario'
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
 *       403:
 *         description: Acesso não autorizado
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
