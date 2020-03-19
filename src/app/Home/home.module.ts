import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NganHangCauHoiComponent} from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';
import {HomeRoutingModule} from './home-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule, ButtonModule, CalendarModule, CheckboxModule, DataViewModule, PaginatorModule, TableModule} from 'primeng';
import {DialogModule} from 'primeng/dialog';
import { SoanDeComponent } from './soan-de/soan-de.component';

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
        DialogModule,
        PaginatorModule,
        ReactiveFormsModule,
        CalendarModule,
        DataViewModule,
        CheckboxModule,
        AutoCompleteModule
    ],
  declarations: [
    NganHangCauHoiComponent,
    SoanDeComponent
  ]
})
export class HomeModule {
}
