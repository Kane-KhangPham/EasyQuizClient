import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeThi} from '../../shared/Model/DeThi';
import {Question} from '../../shared/Model/Question';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';

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
  listCauHoi = [];
  displayCreateModal = false;
  selectedQuestions = [];


  constructor(private fb: FormBuilder,
              private cauHoiService: CauHoiService) {
  }

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

  deleteQuestion(questionId: number) {

  }

  showPopupAddQuestion() {
    this.displayCreateModal = true;
  }

  questions = [];

  totalRecords = 0;

  loadData($event) {
    console.log('---', $event);
    const pageSize = $event.rows;
    const page = ($event.first / pageSize) + 1;
    this.cauHoiService.getListCauHoi(page, pageSize)
      .subscribe(res => {
        this.questions = res.data;
        this.totalRecords = res.totalRow;
      });
  }

  addQuestion() {
    console.log('List selected Cau hoi', this.selectedQuestions);
    this.listCauHoi = this.questions.filter(x => x.checked);
    console.log('List Cau hoi', this.listCauHoi);
    this.selectedQuestions = [];
    this.displayCreateModal = false;
  }

  viewDeThi() {
    const data = {
      monHoc: {
        id: 1,
        name: 'IT1110, Tin học đại cương'
      },
      lopThi: {
        id: 1,
        name: 'CNTT2'
      },
      kiThi: {
        id: 1,
        name: 'Giữa kì'
      },
      maDeThi: 3,
      ngayThi: '12/02/2020',
      soCauHoi: 4,
      cauHoi: this.listCauHoi
    };
    console.log('data:   ', data);
    this.cauHoiService.viewDeThi(data).subscribe(response => {
      let file = new Blob([response], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);

      var win = window.open();
        win.document.write(`<object
              data="${fileURL}" type="application/pdf" width="100%" height="100%">
              <iframe
                src="${fileURL}"
                width="100%"
                height="100%"
                style="border: none;">
                <p>Your browser does not support PDFs.
                  <a href="${fileURL}">Tải file</a>.</p>
              </iframe>
            </object>`);

    });
  }
}
