import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeThi, ObjectReference} from '../../shared/Model/DeThi';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';
import {ToastMessageService} from '../../shared/services/toast-message.service';
import * as moment from 'moment';
import {ConfirmationService, MenuItem} from 'primeng';
import {ActivatedRoute} from '@angular/router';

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
  deId = 0;
  pageSize = 25;
  isSaved = false;

  constructor(private fb: FormBuilder,
              private cauHoiService: CauHoiService,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: ToastMessageService) {
  }

  ngOnInit(): void {
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
    this.initForm();
    this.deId = +this.route.snapshot.paramMap.get('id');
    if (this.deId) {
      this.cauHoiService.getDeThiDetail(this.deId).subscribe((data: any) => {
        this.deThiData = data;
        this.listCauHoi = this.deThiData.cauHoi.map((x: any) => {
          x.checked = true;
          return x;
        });
        this.puListQuestionSelected = JSON.parse(JSON.stringify(this.listCauHoi));
        this.loadData({first: 0, rows: this.pageSize});
        const kieuDanTrang = this.listKieuDanTrang.find(x => x.id === this.deThiData.kieuDanTrang)
        const formData = {
          lopHoc: this.deThiData.lopHoc,
          kyThi: this.deThiData.kyThi,
          monHoc: this.deThiData.monHoc,
          ngayThi: new Date(this.deThiData.ngayThi.toString()),
          thoiGian: this.deThiData.thoiGian,
          soCau: this.deThiData.soCau,
          soLuongDe: this.deThiData.soLuongDe,
          ghiChu: this.deThiData.ghiChu,
          kieuDanTrang: kieuDanTrang
        };
        this.deThiForm.patchValue(formData);
        this.deThiForm.get('soLuongDe').disable();
      });
    }
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
      kyThi: [this.deThiData.kyThi, Validators.required],
      monHoc: [this.deThiData.monHoc, Validators.required],
      ngayThi: [this.deThiData.ngayThi, Validators.required],
      thoiGian: [this.deThiData.thoiGian, Validators.required],
      soCau: [this.deThiData.soCau, Validators.required],
      soLuongDe: [this.deThiData.soLuongDe, Validators.required],
      ghiChu: [this.deThiData.ghiChu],
      kieuDanTrang: [this.deThiData.kieuDanTrang, Validators.required]
    });
  }

  /**
   * Xóa câu hỏi trong danh sách đề thi
   */
  deleteQuestion(questionId: number) {
    const index = this.listCauHoi.findIndex(x => x.id === questionId);
    if (index >= 0) {
      this.confirmationService.confirm({
        message: 'Xác nhận xóa câu hỏi?',
        header: 'Cảnh báo',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.listCauHoi.splice(index, 1);
          const indexPopup = this.puListQuestionSelected.findIndex(x => x.id === questionId);
          this.puListQuestionSelected.splice(indexPopup, 1);
        },
        key: 'deleteConfirmDialog'
      });
    }
  }

  showPopupAddQuestion() {
    const monHoc = this.deThiForm.get('monHoc').value;
    if (!monHoc) {
      this.messageService.warn('Vui lòng chọn môn học');
      return;
    }
    this.displayCreateModal = true;
    this.puMonHocSearch = monHoc;
    this.loadData({first: 0, rows: this.pageSize});
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
    this.listCauHoi = JSON.parse(JSON.stringify(this.puListQuestionSelected));
    this.displayCreateModal = false;
    this.questions = [];
  }

  isCreation() {
    return this.deId <= 0;
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
    if (this.isCreation()) {
      this.cauHoiService.saveDeThi(data).subscribe(x => {
        if ( x.success) {
          this.messageService.success(x.message);
        } else {
          this.messageService.error(x.message);
        }
        this.isSaved = true;
      }, error => {
        this.messageService.error('Tạo đề thi thất bại!');
      });
    } else {
      // cập nhật đề thi
      this.cauHoiService.updateDeThi(data).subscribe(x => {
        this.messageService.success('Cập nhật đề thi thành công!');
        this.isSaved = true;
      }, error => {
        this.messageService.error('Cập nhật đề thi thất bại!');
      });
    }
  }

  get f() {
    return this.deThiForm.controls;
  }

  /**
   * chuẩn bị dữ liệu
   */
  prepareData(): any {
    const formRawData = this.deThiForm.getRawValue();
    if (!this.validateData()) {
      this.messageService.error('Chưa nhập đủ thông tin!');
      return;
    }
    if (Number(formRawData.soCau) !== this.listCauHoi.length) {
      this.messageService.warn('Số lượng câu hỏi không khớp nhau!');
      return;
    }
    formRawData.kieuDanTrang = formRawData.kieuDanTrang.id;
    formRawData.ngayThi = moment(formRawData.ngayThi, 'MM/DD/YYYY').format('YYYY-MM-DD');
    const data = JSON.parse(JSON.stringify(formRawData));
    data.cauHois = this.listCauHoi;
    data.id = this.deId || 0;
    return data;
  }

  /**
   * Validate data
   */
  validateData() {
    return this.deThiForm.valid;
  }

  viewDeThi() {
    const data = this.prepareData();
    if (!data) {
      return;
    }
    data.soDe = this.deThiData?.soDe;
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
      rows: this.pageSize,
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
