import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        loadComponent: () =>
          import('./pages/home/tabs/info/info').then((m) => m.Info),
      },
      {
        path: 'cost',
        loadComponent: () =>
          import('./pages/home/tabs/cost/cost').then((m) => m.Cost),
      },
      {
        path: 'agenda',
        loadComponent: () =>
          import('./pages/home/tabs/agenda/agenda').then((m) => m.Agenda),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
