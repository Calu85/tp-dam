import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'listado-dispositivos/:id',
    loadComponent: () => import('./listado-dispositivos/listado-dispositivos.page').then( m => m.ListadoDispositivosPage),
  }
];
