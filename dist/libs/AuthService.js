"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const generateToken = (userId) => {
    const token = (0, jsonwebtoken_1.sign)({ userId }, 'secretpassword', { expiresIn: '1h' });
    return token;
};
const authenticateUser = async (email, password) => {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
        return null; // user not found
    }
    const passwordMatch = await (0, bcrypt_1.compare)(password, user.senha);
    if (!passwordMatch) {
        return null; // wrong password
    }
    const token = generateToken(user.id);
    return token;
};
exports.authenticateUser = authenticateUser;
