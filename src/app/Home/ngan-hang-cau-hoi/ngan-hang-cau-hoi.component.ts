import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, DialogService, DynamicDialogRef, FileUpload, SelectItem} from 'primeng';
import {CauHoiService} from './cau-hoi.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastMessageService} from '../../shared/services/toast-message.service';
import {ErorUploadDialog} from './erorUploadDialog';

@Component({
  selector: 'app-ngan-hang-cau-hoi',
  templateUrl: './ngan-hang-cau-hoi.component.html',
  styleUrls: ['./ngan-hang-cau-hoi.component.css']
})
export class NganHangCauHoiComponent implements OnInit, OnDestroy {
  @ViewChild('uploadbtn') uploadBtn: FileUpload;
  displayCreateModal = false;
  listMonHocMain: SelectItem[] = [];
  listMonHoc: SelectItem[] = [];
  listCauHoi = [];
  selectedMonHoc: number;
  pageSize = 25;
  totalRow = 0;
  isCreate = true;
  loading: boolean;
  selectedQuestion = null;
  listDapAn: SelectItem[] = [];
  keyword = '';
  ref: DynamicDialogRef;

  createForm: FormGroup;

  constructor(private cauHoiService: CauHoiService,
              private buider: FormBuilder,
              public dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private messageService: ToastMessageService) {
  }

  show(data) {
    this.ref = this.dialogService.open(ErorUploadDialog, {
      header: 'Danh sác câu hỏi đã tồn tại',
      width: '60%',
      data: data,
      contentStyle: {'max-height': '350px', overflow: 'auto'}
    });
  }

  ngOnDestroy() {
    this.ref.close();
  }

  ngOnInit(): void {
    this.getLookupData();
    this.initForm();
    this.listDapAn = [
      {
        label: 'A',
        value: 'A'
      },
      {
        label: 'B',
        value: 'B'
      },
      {
        label: 'C',
        value: 'C'
      },
      {
        label: 'D',
        value: 'D'
      },
    ];
    this.loading = true;
  }

  /**
   * Lấy dữ liệu cho combo box
   */
  getLookupData() {
    this.cauHoiService.getSubjectLookup().subscribe(
      response => {
        this.listMonHoc = JSON.parse(JSON.stringify(response));
        this.listMonHocMain = response;
        this.listMonHocMain.unshift({
          label: 'Tất cả',
          value: 0
        });
      });
  }

  /**
   * Call api lấy danh sách câu hỏi
   * @param page
   * @param monHocId
   * @param keyword
   */
  private getListcauHoi(page = 1, monHocId = 0, keyword: string = '') {
    this.cauHoiService.getListCauHoi(page, this.pageSize, monHocId, keyword)
      .subscribe(res => {
        this.listCauHoi = res.data;
        this.totalRow = res.totalRow;
        this.loading = false;
      });
  }

  /**
   * Phân trang
   * @param $event
   */
  loadListQuestion($event) {
    const page = ($event.first / this.pageSize) + 1;
    this.loading = true;
    const monHocId = this.selectedMonHoc;
    this.getListcauHoi(page, monHocId, this.keyword);
  }

  /**
   * tìm kiếm
   */
  search() {
    this.loadListQuestion({first: 0});
  }

  showCreateModal() {
    this.isCreate = true;
    this.displayCreateModal = true;
  }

  /**
   * Khởi tạo form
   */
  initForm() {
    this.createForm = this.buider.group({
      subject: [null, Validators.required],
      question: ['', Validators.required],
      optionA: ['', Validators.required],
      optionB: ['', Validators.required],
      optionC: ['', Validators.required],
      optionD: ['', Validators.required],
      dapAn: ['', Validators.required]
    });
  }

  /**
   * Thêm mới hoặc edit question
   */
  saveQuestion() {
    // validate data
    if (this.createForm.invalid) {
      this.messageService.warn('Dữ liệu không hợp lệ!');
      return;
    }
    let data;
    if (this.isCreate) {
      data = this.createForm.getRawValue();
      data.monHocId = data.subject;
      delete data.subject;
      this.cauHoiService.createQuestion(data).subscribe(res => {
        this.messageService.success('Tạo mới câu hỏi thành công');
        this.createForm.reset();
        this.displayCreateModal = false;
        this.getListcauHoi();

        this.displayCreateModal = false;
      });
    } else {
      const fieldMapping = ['optionA', 'optionB', 'optionC', 'optionD'];
      data = this.createForm.getRawValue();
      const postData: any = {};
      postData.monHocId = data.subject;
      postData.question = data.question;
      postData.id = this.selectedQuestion.id;
      postData.options = this.selectedQuestion.options.map((item, index) => {
        item.value = data[fieldMapping[index]];
        item.isDapAn = false;
        delete item.content;
        return item;
      });
      // lap dap an;
      const dapAnKeyIndex = this.listDapAn.findIndex(x => x.value === data.dapAn);
      postData.options[dapAnKeyIndex].isDapAn = true;

      this.cauHoiService.updateQuestion(postData).subscribe(res => {
        this.messageService.success('Cập nhật thành công!');
        this.createForm.reset();
        this.displayCreateModal = false;
        this.getListcauHoi();
        this.displayCreateModal = false;
      });
    }
  }

  /**
   * Xóa câu hỏi
   * @param questionId
   */
  deleteQuestion(questionId: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa câu hỏi này?',
      header: 'Cảnh báo',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.cauHoiService.deleteQuestion(questionId)
          .subscribe(res => {
            if (res.success) {
              this.messageService.success('Xoá thành công!');
              this.getListcauHoi();
            } else {
              this.messageService.error(res.message);
            }
          });
      },
      key: 'deleteConfirmDialog'
    });
  }

  /**
   * Sửa câu hỏi
   * @param question
   */
  editQuestion(question: any) {
    this.selectedQuestion = question;
    this.isCreate = false;
    const dapAnKeyIndex = (question.options as Array<any>).findIndex(x => x.isDapAn);
    const bindFormData = {
      subject: this.listMonHoc.find(x => x.label === question.monHoc)?.value,
      question: question.content,
      optionA: question.options[0].content,
      optionB: question.options[1].content,
      optionC: question.options[2].content,
      optionD: question.options[3].content,
      dapAn: this.listDapAn[dapAnKeyIndex]?.value
    };

    this.createForm.patchValue(bindFormData);
    this.displayCreateModal = true;
  }

  import(event) {
    let file: File;
    if (event && event.files && event.files.length > 0) {
      file = event.files[0];
      console.log('file selected', file);
      this.cauHoiService.importExcel(file).subscribe((res: any) => {
        this.uploadBtn.clear();
        if (res.success) {
          this.messageService.success('Import thành công');
          this.search();
          return;
        }
        if (res.error) {
          if (!res.error.data) {
            this.messageService.error(res.error.message);
          } else {
            this.show(res.error.data);
          }
        }
      });
    } else {
      this.messageService.warn('Vui lòng chọn file');
    }
  }
}
