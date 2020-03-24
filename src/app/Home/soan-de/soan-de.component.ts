import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeThi, ObjectReference} from '../../shared/Model/DeThi';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';
import {ToastMessageService} from '../../shared/services/toast-message.service';
import * as moment from 'moment';
import {MenuItem} from 'primeng';

@Component({
  selector: 'app-soan-de',
  templateUrl: './soan-de.component.html',
  styleUrls: ['./soan-de.component.css']
})
export class SoanDeComponent implements OnInit {
  listLopHoc: ObjectReference[] = [];
  listKiThi: ObjectReference[] = [];
  listMonHoc: ObjectReference[] = [];
  deThiData: DeThi = new DeThi();
  deThiForm: FormGroup;
  listCauHoi = [];
  displayCreateModal = false;
  selectedQuestions = [];
  questions = [];
  listKieuDanTrang: ObjectReference[] = [];
  totalRecords = 0;
  items: MenuItem[];

  constructor(private fb: FormBuilder,
              private cauHoiService: CauHoiService,
              private messageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getDataForCombobox();
    this.items = [
      {
        label: 'Tải đề thi', icon: 'pi pi-refresh', command: () => {
          this.downloadDeThi();
        }
      },
      {
        label: 'Tải đáp án', icon: 'pi pi-info', command: () => {
          this.downloadDeThi();
        }
      },
    ];
  }

  /**
   * Tải đề thi
   */
  downloadDeThi(isContainDapAn = false) {
    const data = this.prepareData();
    if (!data) {
      return;
    }
    this.cauHoiService.viewDeThi(data).subscribe(response => {
      const file = new Blob([response], {type: 'application/octet-stream'});
      const fileURL = URL.createObjectURL(file);
      const downloadElement = document.createElement('a');
      downloadElement.href = fileURL;
      const downloadFileName = `DeThi_${data.kyThi.value},${data.ngayThi.substring(0, 4)}_${data.monHoc.value}.pdf`;
      downloadElement.download = downloadFileName;
      downloadElement.click();
    });
  }

  /**
   * Lấy danh sách dữ liệu cho combobox
   */
  getDataForCombobox() {
    this.listKieuDanTrang = [
      {
        id: 1,
        value: 'Toàn trang'
      },
      {
        id: 2,
        value: '2 cột'
      },
    ];
    this.cauHoiService.getListKyThi().subscribe(data => {
      this.listKiThi = data;
    });
    this.cauHoiService.getListLopHoc().subscribe(data => {
      this.listLopHoc = data;
    });
  }

  initForm() {
    this.deThiForm = this.fb.group({
      lopHoc: [this.deThiData.lopHoc],
      kyThi: [this.deThiData.kyThi],
      monHoc: [this.deThiData.monHoc],
      ngayThi: [this.deThiData.ngayThi],
      thoiGian: [this.deThiData.thoiGian],
      soCau: [this.deThiData.soCau],
      soLuongDe: [this.deThiData.soLuongDe],
      ghiChu: [this.deThiData.ghiChu],
      kieuDanTrang: [this.deThiData.kieuDanTrang]
    });
  }

  /**
   * Xóa câu hỏi trong danh sách đề thi
   */
  deleteQuestion(questionId: number) {
    console.log('-- delete question with id:', questionId);
    const index = this.listCauHoi.findIndex(x => x.id === questionId);
    if (index >= 0) {
      this.listCauHoi.splice(index, 1);
    }
  }

  showPopupAddQuestion() {
    this.displayCreateModal = true;
  }

  loadData($event) {
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
    this.selectedQuestions = [];
    this.displayCreateModal = false;
  }

  /**
   * Gọi ý môn học
   */
  filterMonHoc(event) {
    const query = event.query;
    this.cauHoiService.suggestionMonHoc(query).subscribe(subjects => {
      this.listMonHoc = subjects;
    });
  }

  /**
   * Lưu đề thi
   */
  saveDeThi() {
    const data = this.prepareData();
    if (!data) {
      return;
    }
    console.log('Form data:', data);
    this.cauHoiService.saveDeThi(data).subscribe(x => {
      this.messageService.success('Success');
    });
  }

  /**
   * chuẩn bị dữ liệu
   */
  prepareData(): any {
    const formRawData = this.deThiForm.getRawValue();
    if (!this.validateData()) {
      this.messageService.error('Chưa đủ thông tin');
      return;
    }
    formRawData.ngayThi = moment(formRawData.ngayThi, 'MM/DD/YYYY').format('YYYY-MM-DD');
    const data = JSON.parse(JSON.stringify(formRawData));
    data.cauHois = this.listCauHoi;
    return data;
  }

  /**
   * Validate data
   */
  validateData() {
    return true;
  }

  viewDeThi() {
    const data = this.prepareData();
    if (!data) {
      return;
    }
    this.cauHoiService.viewDeThi(data).subscribe(response => {
      const file = new Blob([response], {type: 'application/pdf'});
      // tslint:disable-next-line:prefer-const
      let fileURL = URL.createObjectURL(file);

      const win = window.open();
      win.document.write(`<body><object
              data="${fileURL}" type="application/pdf" width="100%" height="100%" name="xin chao a khang">
            </object></body>`);
    });
  }
}
