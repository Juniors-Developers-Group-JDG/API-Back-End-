import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

const generateToken = (userId: number): string => {
  const token = sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<string | null> => {
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
