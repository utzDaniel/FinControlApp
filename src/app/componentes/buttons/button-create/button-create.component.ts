import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-create',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button-create.component.html',
  styleUrl: './button-create.component.css',
})
export class ButtonCreateComponent {
  @Input() disabled: boolean = true;
  @Output() actionResult = new EventEmitter<any>();

  createItem(event: MouseEvent): void {
    this.actionResult.emit(event);
  }
}
