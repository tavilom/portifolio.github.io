import type { Funcionario } from './Funcionario';
import type { Vale } from './Vale';
import type { Mercadoria } from './Mercadoria';

export type TipoMovimentacao = 'ENTRADA' | 'SAIDA' | 'PESADO';

export type Dinheiro = {
  id: number;
  tipo: string;
  valor: number;  

  criadoEm: Date;
  atualizadoEm: Date;
  dataMovimentacao: Date;

  movimentacao: TipoMovimentacao;

  funcionarios: Funcionario[];
  vales: Vale[];

  mercadoria?: Mercadoria | null;
  mercadoriaId?: number | null;
};
