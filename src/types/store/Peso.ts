import type { Mercadoria } from './Mercadoria';

export type Peso = {
  id: number;
  pesoKg: number;
  dataCadastro: Date;

  mercadoria?: Mercadoria | null;
};
