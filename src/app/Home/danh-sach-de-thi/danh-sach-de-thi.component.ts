import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng';
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
  selectedMonHoc = 0;
  pageSize = 25;
  totalRow = 0;
  keyword = '';
  rowGroupMetadata: {};

  constructor(private cauHoiService: CauHoiService,
              private messageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.getLookupData();
    this.listDeThi = [
      {
        deThiRootId: 1,
        monHoc: 'Sinh học 1',
        kyThi: 'Giữa kỳ 1 2020',
        lopThi: 'Công nghệ thông tin 1 - K55'
      },
      {
        deThiRootId: 1,
        monHoc: 'Sinh học 1',
        kyThi: 'Giữa kỳ 1 2020',
        lopThi: 'Công nghệ thông tin 1 - K55'
      },
      {
        deThiRootId: 1,
        monHoc: 'Sinh học 1',
        kyThi: 'Giữa kỳ 1 2020',
        lopThi: 'Công nghệ thông tin 1 - K55'
      },
      {
        deThiRootId: 2,
        monHoc: 'Sinh học 2',
        kyThi: 'Giữa kỳ 1 2020',
        lopThi: 'Công nghệ thông tin 1 - K55'
      },
      {
        deThiRootId: 2,
        monHoc: 'Sinh học 2',
        kyThi: 'Giữa kỳ 1 2020',
        lopThi: 'Công nghệ thông tin 1 - K55'
      },
    ];
    this.updateRowGroupMetaData();
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
  getListDeThi(page = 1, monHocId = 0, keyword: string = '') {
    this.cauHoiService.getListCauHoi(page, this.pageSize, monHocId, keyword)
      .subscribe(res => {
        this.listDeThi = res.data;
        this.totalRow = res.totalRow;
      });
  }

  /**
   * Phân trang
   * @param $event
   */
  loadDeThi($event) {
    const page = ($event.first / this.pageSize) + 1;
    const monHocId = this.selectedMonHoc;
    this.getListDeThi(page, monHocId, this.keyword);
  }

  /**
   * tìm kiếm
   */
  search() {
    // this.loadListQuestion({first: 0});
  }
}

