import type { Dinheiro } from './Dinheiro';

export type Funcionario = {
  id: number;
  nome: string;
  funcao: string;
  salario: number;

  criadoEm: Date;
  atualizadoEm: Date;

  dinheiroId: number;
  dinheiro: Dinheiro;
};
