export interface DetalheDespesa {
  idDespesa: number;
  idItem: number;
  idFamilia: number;
  tipoDespesa: number;
  preco: number;
  quantidade: number;
  descricao?: string;
  despesaFamiliar?: boolean;
}
