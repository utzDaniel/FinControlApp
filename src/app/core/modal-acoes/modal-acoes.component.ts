import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../core/dialog-data';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-acoes',
  imports: [MatDialogModule, MatIconModule, CommonModule],
  templateUrl: './modal-acoes.component.html',
  styleUrl: './modal-acoes.component.css',
})
export class ModalAcoesComponent implements OnInit {
  isVisible: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ModalAcoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close(false);
    this.isVisible = false;
  }

  confirmDialog(): void {
    this.dialogRef.close(true);
    this.isVisible = false;
  }
}
