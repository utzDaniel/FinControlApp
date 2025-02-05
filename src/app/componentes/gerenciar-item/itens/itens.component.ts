import { ButtonDeleteComponent } from './../../buttons/button-delete/button-delete.component';
import { ItemService } from '../item.service';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../../../core/DialogData';
import { ButtonEditComponent } from '../../buttons/button-edit/button-edit.component';
import { ButtonCreateComponent } from '../../buttons/button-create/button-create.component';
import { FormsModule } from '@angular/forms';
import { ButtonSaveComponent } from '../../buttons/button-save/button-save.component';
import { ButtonCancelComponent } from '../../buttons/button-cancel/button-cancel.component';
import { Item } from '../../../core/item';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-itens',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonDeleteComponent,
    ButtonEditComponent,
    ButtonCreateComponent,
    FormsModule,
    ButtonSaveComponent,
    ButtonCancelComponent,
  ],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css',
})
export class ItensComponent implements OnInit, AfterViewInit {
  readonly DIALOG_DATA: DialogData = {
    title: 'Confirmar Exclusão',
    message: 'Tem certeza que deseja excluir este item?',
  };
  readonly COLUNAS: string[] = ['id', 'nome'];
  readonly _snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>();

  selectedItem?: Item | null;
  isEditing: boolean = false;
  newItem: Item = { id: 0, nome: '' };
  newOld: Item = { id: 0, nome: '' };
  isModalOpen: boolean = false;

  constructor(readonly service: ItemService) {}

  ngOnInit(): void {
    this.service.listar().subscribe((itens) => {
      this.dataSource.data = [...itens];
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  filtrar(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selecionar(item: Item): void {
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
    this.dataSource.data = [this.newItem, ...this.dataSource.data];
    this.selectedItem = this.newItem;
  }

  onEdit(): void {
    this.newOld = { id: this.selectedItem!.id, nome: this.selectedItem!.nome };
    this.newItem = this.selectedItem!;
    this.isEditing = true;
  }

  onDelete(event: any): void {
    if (event && this.selectedItem) {
      const data = this.dataSource.data.filter(
        (item) => item.id !== this.selectedItem?.id
      );
      this.dataSource.data = [...data];
      this.service.excluir(this.selectedItem.id!).subscribe(() => {
        this.infoAcao('Item deletado', 'X');
      });
    }
    this.selectedItem = null;
  }

  onSave(): void {
    if (this.newItem.id !== 0) {
      this.service.editar(this.newItem).subscribe(() => {
        this.infoAcao('Item editado', 'X');
      });
    } else {
      this.service.criar(this.newItem).subscribe((item) => {
        this.dataSource.data.filter((item) => item.id === 0)[0].id = item.id;
        this.infoAcao('Item criado', 'X');
      });
    }
    this.newItem = { id: -1, nome: '' };
    this.isEditing = false;
    this.selectedItem = null;
  }

  onCancel(): void {
    if (this.newItem.id !== 0) {
      this.dataSource.data.filter(
        (item) => item.id === this.newOld.id
      )[0].nome = this.newOld.nome;
    } else {
      const data = this.dataSource.data.filter(
        (item) => item.id !== this.newItem.id
      );
      this.dataSource.data = [...data];
    }
    this.newItem = { id: 0, nome: '' };
    this.isEditing = false;
    this.selectedItem = null;
  }

  atualizarCampo(element: any, campo: string, evento: any): void {
    element[campo] = evento.target.value;
  }

  infoAcao(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 1200,
    });
  }
}
