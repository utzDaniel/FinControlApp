import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-cancel',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-cancel.component.html',
  styleUrl: './button-cancel.component.css',
})
export class ButtonCancelComponent {
  @Input() texto: string = '';
  @Output() actionResult = new EventEmitter<any>();

  cancelAction(event: MouseEvent): void {
    this.actionResult.emit(event);
  }
}
