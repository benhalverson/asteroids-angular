import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./game/game.component').then(m => m.GameComponent)
  }
];
