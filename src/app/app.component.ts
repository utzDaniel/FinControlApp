import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CabecalhoComponent,
    RodapeComponent,
    MenuLateralComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FinControlApp';
}
