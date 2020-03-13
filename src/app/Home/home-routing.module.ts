import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NganHangCauHoiComponent } from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';
import {SoanDeComponent} from './soan-de/soan-de.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ngan-hang-cau-hoi',
    pathMatch: 'full'
  },
  {
    path: 'ngan-hang-cau-hoi',
    component: NganHangCauHoiComponent
  },
  {
    path: 'soan-de',
    component: SoanDeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
