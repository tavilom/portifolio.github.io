// src/types/Carrinho.ts (ou onde você organizar seus types)

export interface Carrinho {
  id: number;
  numeroCarrinho: number;
  nomeUsuario: string;

  // vem do backend como ISO string (ex: "2025-02-10T10:30:00.000Z")
  dataRetirada: string;
  dataEntrega: string;

  // caminho/URL da foto salva no backend (ex: "uploads/carrinhos/carrinho-123.jpg")
  foto: string;
}
