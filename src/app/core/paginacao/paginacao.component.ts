import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Paginacao } from '../paginacao';

@Component({
  selector: 'app-paginacao',
  imports: [CommonModule],
  templateUrl: './paginacao.component.html',
  styleUrl: './paginacao.component.css',
})
export class PaginacaoComponent {
  @Input() paginacao: Paginacao<any> = 
  {
    paginaAtual: 1,
    quantidadeDePaginas: 10,
    quantidadeTotalDeItens: 100,
    itensPorPagina: 10,
    itens: []
  };

  @Output() paginaMudou = new EventEmitter<number>();

  irParaPaginaAnterior(): void {
    if (this.paginacao.paginaAtual > 1) {
      this.paginacao.paginaAtual--;
      this.paginaMudou.emit(this.paginacao.paginaAtual);
    }
  }

  irParaProximaPagina(): void {
    if (this.paginacao.paginaAtual < this.paginacao.quantidadeDePaginas) {
      this.paginacao.paginaAtual++;
      this.paginaMudou.emit(this.paginacao.paginaAtual);
    }
  }

  irParaPagina(pagina: number): void {
    if (pagina === this.paginacao.paginaAtual) return;
    this.paginacao.paginaAtual = pagina;
    this.paginaMudou.emit(this.paginacao.paginaAtual);
  }

  gerarPaginas(): number[] {
    return Array.from({ length: this.paginacao.quantidadeDePaginas }, (_, i) => i + 1);
  }

  mostrarFaixaDeItens(): string {
    const inicio = (this.paginacao.paginaAtual - 1) * this.paginacao.itensPorPagina + 1;
    const fim = Math.min(
      this.paginacao.paginaAtual * this.paginacao.itensPorPagina,
      this.paginacao.quantidadeTotalDeItens
    );
    return `${inicio} - ${fim} de ${this.paginacao.quantidadeTotalDeItens}`;
  }
}
