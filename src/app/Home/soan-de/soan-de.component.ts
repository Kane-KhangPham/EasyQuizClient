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
  deThiForm: FormGroup;
  listCauHoi = [];
  displayCreateModal = false;
  selectedQuestions = [];
  questions = [];
  totalRecords = 0;

  constructor(private fb: FormBuilder,
              private cauHoiService: CauHoiService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataForCombobox();
  }

  /**
   * Lấy danh sách dữ liệu cho combobox
   */
  getDataForCombobox() {
    this.cauHoiService.getListKyThi().subscribe(data => {
      this.listKiThi = data;
    });
    this.cauHoiService.getListLopHoc().subscribe(data => {
      this.listLopHoc = data;
    })
  }

  initForm() {
    this.deThiForm = this.fb.group({
      lopHocId: [this.deThiData.lopHocId],
      kyThiId: [this.deThiData.kyThiId],
      monHocId: [this.deThiData.monHocId],
      ngayThi: [this.deThiData.ngayThi],
      thoiGian: [this.deThiData.thoiGian],
      soCau: [this.deThiData.soCau],
      soLuongDe: [this.deThiData.soLuongDe],
      ghiChu: [this.deThiData.ghiChu]
    });
  }

  /**
   * Xóa câu hỏi trong danh sách đề thi
   * @param questionId
   */
  deleteQuestion(questionId: number) {
    console.log('-- delete question with id:', questionId);
    const index = this.listCauHoi.findIndex(x => x.id === questionId);
    if(index >= 0) {
      this.listCauHoi.splice(index, 1);
    }
  }

  showPopupAddQuestion() {
    this.displayCreateModal = true;
  }

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
    this.listCauHoi = this.questions.filter(x => x.checked);
    console.log('-- list cau hoi: ', this.listCauHoi);
    this.selectedQuestions = [];
    this.displayCreateModal = false;
  }

  /**
   * Gọi ý môn học
   * @param event
   */
  filterMonHoc(event) {
    let query = event.query;
    this.cauHoiService.suggestionMonHoc(query).subscribe(subjects => {
      this.listMonHoc = subjects;
    });
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
