import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NganHangCauHoiComponent} from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';
import {HomeRoutingModule} from './home-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {ButtonModule, TableModule} from 'primeng';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    HomeRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DialogModule
  ],
  declarations: [
    NganHangCauHoiComponent
  ]
})
export class HomeModule {
}
