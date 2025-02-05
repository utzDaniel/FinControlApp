import { DialogData } from '../../../core/DialogData';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcoesComponent } from '../../modal-acoes/modal-acoes.component';

@Component({
  selector: 'app-button-delete',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-delete.component.html',
  styleUrl: './button-delete.component.css',
})
export class ButtonDeleteComponent {
  constructor(readonly dialog: MatDialog) {}

  @Input() disabled: boolean = true;
  @Input() dialogData?: DialogData;
  @Output() actionResult = new EventEmitter<any>();

  openDialog(): any {
    const dialogRef = this.dialog.open(ModalAcoesComponent, {
      data: this.dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.actionResult.emit(result);
    });
  }
}
