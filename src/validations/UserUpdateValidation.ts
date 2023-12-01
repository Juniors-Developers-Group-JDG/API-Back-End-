import { validation } from 'express-validator';
import { ErrorMessage } from '../types/ErrorMessage';
import { PrismaClient } from '@prisma/client';

export async function validateUserUpdate(prisma: PrismaClient, userId: number, body: Partial<User>): Promise<ErrorMessage[]> {
  const errors: ErrorMessage[] = [];

  if ('nome' in body && (!body.nome || body.nome.trim() === '')) {
    errors.push({ field: 'nome', message: 'O nome é obrigatório' });
  }

  if ('email' in body) {
    if (!body.email || body.email.trim() === '') {
      errors.push({ field: 'email', message: 'O e-mail é obrigatório' });
    } else if (!validation.isEmail(body.email)) {
      errors.push({ field: 'email', message: 'O e-mail é inválido' });
    } else {
      const existingUser = await prisma.usuario.findUnique({
        where: { email: body.email },
      });

      if (existingUser && existingUser.id !== userId) {
        errors.push({ field: 'email', message: 'Este e-mail já está em uso por outro usuário' });
      }
    }
  }

  if ('senha' in body && (!body.senha || body.senha.trim() === '' || body.senha.length < 8)) {
    errors.push({ field: 'senha', message: 'A senha é obrigatória e deve ter pelo menos 8 caracteres' });
  }

  if ('cidade' in body && body.cidade && body.cidade.trim() === '') {
    errors.push({ field: 'cidade', message: 'Este campo não pode ser vazio' });
  }

  if ('estado' in body && body.estado && body.estado.trim() === '') {
    errors.push({ field: 'estado', message: 'Este campo não pode ser vazio' });
  }

  if ('telefone' in body && body.telefone && body.telefone.trim() === '') {
    errors.push({ field: 'telefone', message: 'Este campo não pode ser vazio' });
  }

  if ('cau' in body && body.cau && body.cau.trim() === '') {
    errors.push({ field: 'cau', message: 'Este campo não pode ser vazio' });
  }
  
  if ('descricao' in body && body.descricao && body.descricao.trim() === '') {
    errors.push({ field: 'descricao', message: 'A descrição não pode ser vazia' });
  }

  return errors;
}
