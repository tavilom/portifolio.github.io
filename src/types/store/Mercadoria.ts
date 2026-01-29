import type { Peso } from './Peso';
import type { Dinheiro } from './Dinheiro';

export type TipoMovimentacao = 'ENTRADA' | 'SAIDA' | 'PESADO';

export type Mercadoria = {
  id: number;
  nome: string;
  precoCompra: number;
  codigoProduto: string;

  criadoEm: Date;
  atualizadoEm: Date;

  pesoId?: number | null;
  peso?: Peso | null;

  dinheiro?: Dinheiro | null;

  movimentacao?: TipoMovimentacao | null;
};
