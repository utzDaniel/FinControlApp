export interface Paginacao<T> {
  paginaAtual: number;
  itensPorPagina: number;
  quantidadeDePaginas: number;
  quantidadeTotalDeItens: number;
  itens: T[];
}
