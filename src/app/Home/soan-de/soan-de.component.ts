import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DeThi, ObjectReference} from '../../shared/Model/DeThi';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';
import {ToastMessageService} from '../../shared/services/toast-message.service';
import * as moment from 'moment';
import {MenuItem} from 'primeng';
import * as _ from 'lodash';

@Component({
  selector: 'app-soan-de',
  templateUrl: './soan-de.component.html',
  styleUrls: ['./soan-de.component.css']
})
export class SoanDeComponent implements OnInit {
  @ViewChild('dataView') dataView;
  listLopHoc: ObjectReference[] = [];
  listKiThi: ObjectReference[] = [];
  listMonHoc: ObjectReference[] = [];
  deThiData: DeThi = new DeThi();
  deThiForm: FormGroup;
  listCauHoi = [];          // list câu hỏi đã chọn ở main view
  displayCreateModal = false;
  questions = [];           // list câu hỏi trong popup chọn câu hỏi
  listKieuDanTrang: ObjectReference[] = [];
  totalRecords = 0;
  items: MenuItem[];
  puMonHocSearch: ObjectReference = new ObjectReference();
  puTextSearch = '';
  puListQuestionSelected = [];

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
          this.downloadDeThi(true);
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
    data.isContainDapAn = isContainDapAn;
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

  /**
   * Lấy danh sách câu hỏi
   * @param $event
   */
  loadData($event) {
    const pageSize = $event.rows;
    const page = ($event.first / pageSize) + 1;
    const monhocId = this.puMonHocSearch.id;
    const keyword = this.puTextSearch;
    this.cauHoiService.getListCauHoi(page, pageSize, monhocId, keyword)
      .subscribe(res => {
        if (this.puListQuestionSelected && this.puListQuestionSelected.length > 0) {
          this.questions = res.data.map(x => {
            const index = this.puListQuestionSelected.findIndex(y => x.id === y.id);
            if (index > -1) {
              return this.puListQuestionSelected[index];
            }
            return x;
          });
        } else {
          this.questions = res.data;
        }
        this.totalRecords = res.totalRow;
      });
  }

  addQuestion() {
    this.listCauHoi = this.puListQuestionSelected;
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
    formRawData.kieuDanTrang = formRawData.kieuDanTrang.id;
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
              data="${fileURL}" type="application/pdf" width="100%" height="100%">
            </object></body>`);
    });
  }

  /**
   * Tìm kiếm câu hỏi trên dialog
   */
  timKiemCauHoi() {
    const pageInfo = {
      rows: 10,
      first: 0
    };
    this.dataView.first = 0;
    this.loadData(pageInfo);
  }

  /**
   * Khi select cau hoi
   * @param question
   */
  selectQuestionChange(question: any) {
    const index = this.puListQuestionSelected.findIndex(x => x.id === question.id);
    if (question.checked) {
      if (index === -1) {
        this.puListQuestionSelected.push(question);
      }
    } else {
      this.puListQuestionSelected.splice(index, 1);
    }
  }
}
