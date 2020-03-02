import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NganHangCauHoiComponent} from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';
import {HomeRoutingModule} from './home-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    HomeRoutingModule,
    DropdownModule,
    FormsModule
  ],
  declarations: [
    NganHangCauHoiComponent
  ]
})
export class HomeModule {
}
