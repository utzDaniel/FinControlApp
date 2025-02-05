import { Component, Inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../core/DialogData';
import { MatIconModule } from '@angular/material/icon';
import { ButtonCancelComponent } from '../buttons/button-cancel/button-cancel.component';
import { ButtonConfirmComponent } from '../buttons/button-confirm/button-confirm.component';

@Component({
  selector: 'app-modal-acoes',
  imports: [
    MatDialogModule,
    MatIconModule,
    ButtonCancelComponent,
    ButtonConfirmComponent,
  ],
  templateUrl: './modal-acoes.component.html',
  styleUrl: './modal-acoes.component.css',
})
export class ModalAcoesComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAcoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  confirmDialog(): void {
    this.dialogRef.close(true);
  }
}
