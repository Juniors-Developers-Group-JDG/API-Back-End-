import { Model } from '@prisma/client';

export const Usuario = Model('Usuario', {
  name: 'usuarios',
  id: {
    type: 'Int',
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: 'String',
    required: true,
  },
  email: {
    type: 'String',
    required: true,
    unique: true,
  },
  senha: {
    type: 'String',
    required: true,
    minLength: 8,
  },
  cidade: {
    type: 'String',
  },
  estado: {
    type: 'Estado',
  },
  telefone: {
    type: 'String',
  },
  cau: {
    type: 'String',
  },
  descricao: {
    type: 'String',
  },
  tipo: {
    type: 'TipoUsuario',
  },
  projetos: {
    type: 'PrismaRelation',
    many: true,
    to: {
      type: 'Projeto',
    },
  },
});
