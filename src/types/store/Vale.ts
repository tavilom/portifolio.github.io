import type { Dinheiro } from './Dinheiro';

export type Vale = {
  id: number;
  nome: string;
  valor: number;
  dataEmprestimo: Date;

  dinheiroId: number;
  dinheiro: Dinheiro;
};      