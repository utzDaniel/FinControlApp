import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-confirm',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-confirm.component.html',
  styleUrl: './button-confirm.component.css',
})
export class ButtonConfirmComponent {
  @Input() disabled: boolean = true;
  @Input() texto: string = '';
  @Output() actionResult = new EventEmitter<any>();

  confirmAction(event: MouseEvent): void {
    this.actionResult.emit(event);
  }
}
