import { Routes, RouterModule } from '@angular/router';

export const Home_Routes: Routes = [
  {
    path: 'ngan-hang-cau-hoi',
    loadChildren: () => import('../../Home/home.module').then(m => m.HomeModule)
  }
];
