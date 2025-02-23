import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../core/item';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() item?: Item;
  @Input() isEditing: boolean = false;
  @Input() idSelect?: number | null;
  @Output() selecionado = new EventEmitter<Item>();

  onSelecionado(): void {
    if (this.item) {
      this.selecionado.emit(this.item);
    }
  }
}
