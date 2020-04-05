import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MenuItem, SelectItem, TieredMenu} from 'primeng';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';
import {ToastMessageService} from '../../shared/services/toast-message.service';

@Component({
  selector: 'app-danh-sach-de-thi',
  templateUrl: './danh-sach-de-thi.component.html',
  styleUrls: ['./danh-sach-de-thi.component.css']
})
export class DanhSachDeThiComponent implements OnInit {
  listDeThi: any[];
  listMonHoc: SelectItem[] = [];
  selectedMonHoc = null;
  pageSize = 25;
  totalRow = 0;
  rowGroupMetadata: {};
  loading: boolean;

  constructor(private cauHoiService: CauHoiService,
              private messageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.getLookupData();
    this.loading = true;
  }

  /**
   * update metadata for group
   */
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.listDeThi) {
      for (let i = 0; i < this.listDeThi.length; i++) {
        const rowData = this.listDeThi[i];
        const rootDeThiId = rowData.deThiRootId;
        if (i === 0) {
          this.rowGroupMetadata[rootDeThiId] = {index: 0, size: 1};
        } else {
          const previousRowData = this.listDeThi[i - 1];
          const previousRowGroup = previousRowData.deThiRootId;
          if (rootDeThiId === previousRowGroup) {
            this.rowGroupMetadata[rootDeThiId].size++;
          } else {
            this.rowGroupMetadata[rootDeThiId] = {index: i, size: 1};
          }
        }
      }
    }
  }

  /**
   * Lấy dữ liệu cho combo box
   */
  getLookupData() {
    this.cauHoiService.getSubjectLookup().subscribe(
      response => {
        this.listMonHoc = response;
        this.listMonHoc.unshift({
          label: 'Tất cả',
          value: 0
        });
      });
  }

  /**
   * Lấy danh sách đề thi
   * @param page
   * @param monHocId
   * @param keyword
   */
  getListDeThi(page) {
    this.loading = true;
    const filter = {
      page,
      pageSize: this.pageSize,
      kyThiId: 0,
      namKyThi: 0,
      monHocId: 0,
      lopHocId: 0
    };
    this.cauHoiService.getListDeThi(filter)
      .subscribe(res => {
        this.listDeThi = res.data;
        this.updateRowGroupMetaData();
        this.totalRow = res.totalRow;
        this.loading = false;
      });
  }

  /**
   * Phân trang
   * @param $event
   */
  loadDeThi($event) {
    const page = ($event.first / this.pageSize) + 1;
    this.getListDeThi(page);
  }

  /**
   * tìm kiếm
   */
  search() {
    this.loadDeThi({first: 0});
  }
}

