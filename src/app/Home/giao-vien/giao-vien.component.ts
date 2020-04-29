import {Component, OnInit} from '@angular/core';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';
import {ToastMessageService} from '../../shared/services/toast-message.service';
import {ConfirmationService} from "primeng";

@Component({
  selector: 'app-giao-vien',
  templateUrl: './giao-vien.component.html',
  styleUrls: ['./giao-vien.component.css']
})
export class GiaoVienComponent implements OnInit {
  listMonHoc = [];
  pageSize = 25;
  totalRow: 0;
  loading: boolean;
  keyword: '';
  tenGiaoVien: '';
  displayCreateModal = false;
  isCreate = false;
  selectedMonHoc: any;
  listKhoa: [];
  selectedKhoa: any;
  listKhoa1: [];
  selectedKhoa1: any;

  constructor(private cauHoiService: CauHoiService,
              private confirmationService: ConfirmationService,
              private messageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.cauHoiService.getListKhoaLookup().subscribe(x => {
      this.listKhoa = x;
      this.listKhoa1 = JSON.parse(JSON.stringify(x));
      const firstItem: any = {
        id: 0,
        value: 'Tất cả'
      };
      // @ts-ignore
      this.listKhoa.unshift(firstItem);
    });
  }

  showCreateModal() {
    this.isCreate = true;
    this.displayCreateModal = true;
  }

  loadMonHocs($event) {
    const page = ($event.first / this.pageSize) + 1;
    this.loading = true;
    this.getListMonHoc(page, this.keyword, this.selectedKhoa?.id);
  }

  search() {
    this.loadMonHocs({first: 0});
  }

  editMonHoc(monHoc: any) {
    this.selectedMonHoc = monHoc;
    this.isCreate = false;
    this.tenGiaoVien = monHoc.name;
    this.selectedKhoa1 = {
      id: monHoc.khoaId,
      value: monHoc.khoaName
    }
    this.displayCreateModal = true;
  }

  deleteMonHoc(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa giáo viên này?',
      header: 'Cảnh báo',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.cauHoiService.deleteGiaoVien(id)
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

  private getListMonHoc(page = 1, keyword: string = '', khoaId?: number) {
    this.cauHoiService.getListGiaoVien(page, this.pageSize, keyword, khoaId)
      .subscribe(res => {
        this.listMonHoc = res.data;
        this.totalRow = res.totalRow;
        this.loading = false;
      });
  }

  save() {
    if (!this.tenGiaoVien) {
      this.messageService.error('Bạn chưa nhập tên giáo viên!');
      return;
    }
    if (!this.selectedKhoa1 || this.selectedKhoa1.id === 0) {
      this.messageService.error('Bạn chưa chọn khoa cho giáo viên!');
      return;
    }

    if (this.isCreate) {
      this.cauHoiService.createGiaoVien(this.tenGiaoVien, this.selectedKhoa1.id).subscribe(res => {
        this.messageService.success('Thêm mới thành công!');
        this.displayCreateModal = false;
        this.getListMonHoc();
      });
    } else {
      this.selectedMonHoc.name = this.tenGiaoVien;
      this.selectedMonHoc.khoaId = this.selectedKhoa1.id;
      this.cauHoiService.updateGiaoVien(this.selectedMonHoc).subscribe(res => {
        this.messageService.success('Cập nhật thành công!');
        this.displayCreateModal = false;
        this.getListMonHoc();
      });
    }
    this.displayCreateModal = false;
    this.getListMonHoc();
  }
}
