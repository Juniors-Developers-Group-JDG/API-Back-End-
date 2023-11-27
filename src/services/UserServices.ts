import { User } from '../models/User';
import { PrismaClient } from '@prisma/client';

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async update(id: number, body: Partial<User>): Promise<User> {
    return this.prisma.usuarios.update({
      data: {
        ...body,
      },
      where: {
        id,
      },
    });
  }
}
