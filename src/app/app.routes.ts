import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () => import('dashboard/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'post',
    loadChildren: () => import('post/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];
