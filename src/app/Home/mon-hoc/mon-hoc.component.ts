import { Component, OnInit } from '@angular/core';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';
import {ToastMessageService} from '../../shared/services/toast-message.service';
import {ConfirmationService} from 'primeng';

@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrls: ['./mon-hoc.component.css']
})
export class MonHocComponent implements OnInit {
  listMonHoc = [];
  pageSize = 25;
  totalRow: 0;
  loading: boolean;
  keyword: '';
  tenMonHoc: '';
  displayCreateModal = false;
  isCreate = false;
  selectedMonHoc: any;

  constructor(private cauHoiService: CauHoiService,
              private confirmationService: ConfirmationService,
              private messageService: ToastMessageService) { }

  ngOnInit(): void {
    this.loading = true;
  }

  showCreateModal() {
    this.isCreate = true;
    this.displayCreateModal = true;
  }

  loadMonHocs($event) {
    const page = ($event.first / this.pageSize) + 1;
    this.loading = true;
    this.getListMonHoc(page, this.keyword);
  }

  search() {
    this.loadMonHocs({first: 0});
  }

  editMonHoc(monHoc: any) {
    this.selectedMonHoc = monHoc;
    this.isCreate = false;
    this.tenMonHoc = monHoc.name;
    this.displayCreateModal = true;
  }

  deleteMonHoc(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa môn học này?',
      header: 'Cảnh báo',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.cauHoiService.deleteQuestion(id)
          .subscribe(res => {
            if (res.success) {
              this.messageService.success('Xoá thành công!');
              this.getListMonHoc();
            } else {
              this.messageService.error(res.message);
            }
          });
      },
      key: 'deleteConfirmDialog'
    });
  }

  private getListMonHoc(page = 1, keyword: string = '') {
    this.cauHoiService.getListMonHoc(page, this.pageSize, keyword)
      .subscribe( res => {
        this.listMonHoc = res.data;
        this.totalRow = res.totalRow;
        this.loading = false;
      });
  }

  save() {
    if (!this.tenMonHoc) {
      this.messageService.error('Bạn chưa nhập tên môn học!');
      return;
    }

    if(this.isCreate) {
      this.cauHoiService.createMonHoc(this.tenMonHoc).subscribe( res => {
        if(res.message) {
          this.messageService.error(res.message);
          return;
        }
        this.messageService.success('Thêm mới thành công!');
        this.displayCreateModal = false;
        this.getListMonHoc();
      });
    } else {
      this.selectedMonHoc.name = this.tenMonHoc;
      this.cauHoiService.updateMonHoc(this.selectedMonHoc).subscribe( res => {
        this.messageService.success('Cập nhật thành công!');
        this.displayCreateModal = false;
        this.getListMonHoc();
      });
    }
  }
}
