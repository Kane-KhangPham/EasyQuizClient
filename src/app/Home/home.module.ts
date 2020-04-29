import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NganHangCauHoiComponent} from './ngan-hang-cau-hoi/ngan-hang-cau-hoi.component';
import {HomeRoutingModule} from './home-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule, ConfirmDialogModule,
    DataViewModule,
    PaginatorModule,
    SplitButtonModule,
    TableModule, TieredMenuModule
} from 'primeng';
import {DialogModule} from 'primeng/dialog';
import { SoanDeComponent } from './soan-de/soan-de.component';
import { DanhSachDeThiComponent } from './danh-sach-de-thi/danh-sach-de-thi.component';
import { MonHocComponent } from './mon-hoc/mon-hoc.component';
import { GiaoVienComponent } from './giao-vien/giao-vien.component';
import { AccountComponent } from './account/account.component';

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
        AutoCompleteModule,
        SplitButtonModule,
        TieredMenuModule,
        ConfirmDialogModule
    ],
  declarations: [
    NganHangCauHoiComponent,
    SoanDeComponent,
    DanhSachDeThiComponent,
    MonHocComponent,
    GiaoVienComponent,
    AccountComponent
  ]
})
export class HomeModule {
}
