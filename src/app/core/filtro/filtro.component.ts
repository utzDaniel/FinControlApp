import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro',
  imports: [],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {

    @Output() actionResult = new EventEmitter<any>();
  
    eventKeyUp(event: Event): any {
      this.actionResult.emit(event);
    }

}
