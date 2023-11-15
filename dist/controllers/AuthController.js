"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const AuthService_1 = require("../libs/AuthService");
const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const token = await (0, AuthService_1.authenticateUser)(email, senha);
        if (!token) {
            res.status(401).json({ error: 'Email ou senha inválidos' });
            return;
        }
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.login = login;
