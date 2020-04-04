import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NganHangCauHoiComponent } from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';
import {SoanDeComponent} from './soan-de/soan-de.component';
import {DanhSachDeThiComponent} from './danh-sach-de-thi/danh-sach-de-thi.component';

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
  },
  {
    path: 'danh-sach-de-thi',
    component: DanhSachDeThiComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
