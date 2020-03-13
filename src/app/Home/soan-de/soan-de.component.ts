import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeThi} from '../../shared/Model/DeThi';
import {Question} from "../../shared/Model/Question";

@Component({
  selector: 'app-soan-de',
  templateUrl: './soan-de.component.html',
  styleUrls: ['./soan-de.component.css']
})
export class SoanDeComponent implements OnInit {
  listLopHoc: SelectItem[];
  listKiThi: SelectItem[];
  listMonHoc: SelectItem[];
  deThiData: DeThi = new DeThi();
  selectedListCauHoi: Question[] = [];
  deThiForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.deThiForm = this.fb.group({
      lopHocId: [this.deThiData.lopHocId],
      kyThiId: [this.deThiData.kyThiId],
      monHocId: [this.deThiData.monHocId],
      ngayThi: [this.deThiData.ngayThi],
      thoiGian: [this.deThiData.thoiGian],
      soCau: [this.deThiData.soCau],
      soLuongDe: [this.deThiData.soLuongDe]
    });
  }
}
