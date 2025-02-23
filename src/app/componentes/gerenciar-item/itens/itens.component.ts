import { ItemService } from '../item.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogData } from '../../../core/dialog-data';
import { FormsModule } from '@angular/forms';
import { Item } from '../../../core/item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonAcoesComponent } from '../../../core/button-acoes/button-acoes.component';
import { PaginacaoComponent } from '../../../core/paginacao/paginacao.component';
import { Paginacao } from '../../../core/paginacao';
import { FiltroComponent } from '../../../core/filtro/filtro.component';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-itens',
  imports: [
    CommonModule,
    FormsModule,
    ButtonAcoesComponent,
    PaginacaoComponent,
    FiltroComponent,
    ItemComponent,
  ],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css',
})
export class ItensComponent implements OnInit {
  readonly DIALOG_DATA: DialogData = {
    title: 'Confirmar Exclusão',
    message: 'Tem certeza que deseja excluir este item?',
  };
  readonly _snackBar = inject(MatSnackBar);
  readonly ITENS_POR_PAGINA: number = 10;

  itensPaginado?: Paginacao<Item>;
  selectedItem?: Item | null;
  filtoValor: string = '';
  isEditing: boolean = false;
  newItem: Item = { id: 0, nome: '' };
  newOld: Item = { id: 0, nome: '' };
  ultimoItem?: Item | null;
  isModalOpen: boolean = false;

  constructor(readonly service: ItemService) {}

  ngOnInit(): void {
    this.service
      .listar(1, this.ITENS_POR_PAGINA, this.filtoValor)
      .subscribe((itensPaginado) => {
        this.itensPaginado = itensPaginado;
      });
  }

  onFiltrar(event: KeyboardEvent): void {
    this.filtoValor = (event.target as HTMLInputElement).value;
    this.service
      .listar(1, this.ITENS_POR_PAGINA, this.filtoValor)
      .subscribe((itensPaginado) => {
        this.itensPaginado = itensPaginado;
      });
  }

  onSelect(item: Item): void {
    if (this.isEditing) return;
    if (this.selectedItem === item) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
    }
  }

  onCreate(): void {
    const nome = this.selectedItem ? this.selectedItem.nome : '';
    this.newItem = { id: 0, nome: nome };
    this.isEditing = true;
    this.itensPaginado!.itens = [this.newItem, ...this.itensPaginado!.itens];
    this.atulizarPaginacao(true);
    this.selectedItem = this.newItem;
    this.ultimoItem = this.itensPaginado!.itens.pop();
  }

  onEdit(): void {
    this.newOld = { id: this.selectedItem!.id, nome: this.selectedItem!.nome };
    this.newItem = this.selectedItem!;
    this.isEditing = true;
  }

  onDelete(event: any): void {
    if (event && this.selectedItem) {
      const data = this.itensPaginado!.itens.filter(
        (item) => item.id !== this.selectedItem?.id
      );
      this.itensPaginado!.itens = [...data];
      this.atulizarPaginacao(false);
      this.service.excluir(this.selectedItem.id!).subscribe(() => {
        this.infoAcao('Item deletado');
      });
    }
    this.selectedItem = null;
  }

  onSave(): void {
    if (this.newItem.id !== 0) {
      this.service.editar(this.newItem).subscribe(() => {
        this.infoAcao('Item editado');
      });
    } else {
      this.service.criar(this.newItem).subscribe((item) => {
        this.itensPaginado!.itens.filter((item) => item.id === 0)[0].id =
          item.id;
        this.infoAcao('Item criado');
      });
    }
    this.newItem = { id: -1, nome: '' };
    this.isEditing = false;
    this.selectedItem = null;
  }

  onCancel(): void {
    if (this.newItem.id !== 0) {
      this.itensPaginado!.itens.filter(
        (item) => item.id === this.newOld.id
      )[0].nome = this.newOld.nome;
    } else {
      const data = this.itensPaginado!.itens.filter(
        (item) => item.id !== this.newItem.id
      );
      this.itensPaginado!.itens = [...data, this.ultimoItem!];
      this.atulizarPaginacao(false);
    }
    this.newItem = { id: 0, nome: '' };
    this.isEditing = false;
    this.selectedItem = null;
  }

  atualizarCampo(element: any, campo: string, evento: any): void {
    element[campo] = evento.target.value;
  }

  infoAcao(message: string): void {
    this._snackBar.open(message, 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 1200,
    });
  }

  onPaginaMudou(pagina: number): void {
    this.service
      .listar(pagina, this.ITENS_POR_PAGINA, this.filtoValor)
      .subscribe((itensPaginado) => {
        this.itensPaginado = itensPaginado;
      });
  }

  atulizarPaginacao(adicionar: boolean): void {
    if (adicionar) this.itensPaginado!.quantidadeTotalDeItens++;
    else this.itensPaginado!.quantidadeTotalDeItens--;
    this.itensPaginado!.quantidadeDePaginas = Math.ceil(
      this.itensPaginado!.quantidadeTotalDeItens /
        this.itensPaginado!.itensPorPagina
    );
  }
}
