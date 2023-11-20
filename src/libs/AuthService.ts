import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authorizationUser = async (email: string) => {
  const user = await prisma.usuario.findFirst({ where: { email } });

  if (user) return false

  return true
};