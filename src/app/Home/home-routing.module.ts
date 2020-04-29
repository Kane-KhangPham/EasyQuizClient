import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NganHangCauHoiComponent } from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';
import {SoanDeComponent} from './soan-de/soan-de.component';
import {DanhSachDeThiComponent} from './danh-sach-de-thi/danh-sach-de-thi.component';
import {MonHocComponent} from './mon-hoc/mon-hoc.component';
import {AccountSettingComponent} from '../account-setting/account-setting.component';
import {GiaoVienComponent} from './giao-vien/giao-vien.component';
import {AccountComponent} from "./account/account.component";

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
    path: 'soan-de/:id',
    component: SoanDeComponent
  },
  {
    path: 'soan-de',
    component: SoanDeComponent
  },
  {
    path: 'danh-sach-de-thi',
    component: DanhSachDeThiComponent
  },
  {
    path: 'list-mon-hoc',
    component: MonHocComponent
  },
  { path: 'account-setting/:id', component: AccountSettingComponent},
  { path: 'list-giao-vien', component: GiaoVienComponent},
  { path: 'list-account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
