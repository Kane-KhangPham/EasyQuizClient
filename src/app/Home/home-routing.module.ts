import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NganHangCauHoiComponent } from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';

const routes: Routes = [
  {
    path: '',
    component: NganHangCauHoiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
