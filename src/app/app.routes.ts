import { Routes } from '@angular/router';
import { ItensComponent } from './componentes/gerenciar-item/itens/itens.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'itens',
    pathMatch: 'full',
  },
  {
    path: 'itens',
    component: ItensComponent,
  },
];
