import { DialogData } from '../dialog-data';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalAcoesComponent } from '../modal-acoes/modal-acoes.component';

@Component({
  selector: 'app-button-acoes',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-acoes.component.html',
  styleUrl: './button-acoes.component.css',
})
export class ButtonAcoesComponent {
  constructor(readonly dialog: MatDialog) {}

  @Input() tipo: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() dialogData?: DialogData;
  @Output() actionResult = new EventEmitter<any>();

  eventAction(event: Event): any {
    if (this.dialogData) {
      const dialogRef = this.dialog.open(ModalAcoesComponent, {
        data: this.dialogData,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.actionResult.emit(result);
      });
    } else {
      this.actionResult.emit(event);
    }
  }
}
