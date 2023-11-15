import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateToken = (userId: number): string => {
  const token = sign({ userId }, 'secretpassword', { expiresIn: '1h' });
  return token;
}

export const authenticateUser = async (email: string, password: string): Promise<string | null> => {
  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user) {
    return null; // user not find
  }

  const passwordMatch = await compare(password, user.senha);

  if (!passwordMatch) {
    return null; // wrong password
  }

  const token = generateToken(user.id);

  return token;
};
