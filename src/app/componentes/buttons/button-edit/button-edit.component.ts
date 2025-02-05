import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-edit',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-edit.component.html',
  styleUrl: './button-edit.component.css',
})
export class ButtonEditComponent {
  @Input() disabled: boolean = true;
  @Output() actionResult = new EventEmitter<any>();

  editItem(event: MouseEvent): void {
    this.actionResult.emit(event);
  }
}
