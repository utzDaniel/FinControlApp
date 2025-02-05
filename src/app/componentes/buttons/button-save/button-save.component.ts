import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-save',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-save.component.html',
  styleUrl: './button-save.component.css',
})
export class ButtonSaveComponent {
  @Input() disabled: boolean = true;
  @Output() actionResult = new EventEmitter<any>();

  saveItem(event: MouseEvent): void {
    this.actionResult.emit(event);
  }
}
