import { Routes, RouterModule } from '@angular/router';

export const Home_Routes: Routes = [
  {
    path: 'de-thi',
    loadChildren: () => import('../../Home/home.module').then(m => m.HomeModule)
  }
];
