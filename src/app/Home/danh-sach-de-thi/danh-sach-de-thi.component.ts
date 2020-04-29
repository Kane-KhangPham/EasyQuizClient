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
  selectedLopThi = null;
  selectedKyThi = null;
  pageSize = 25;
  totalRow = 0;
  rowGroupMetadata: {};
  loading: boolean;
  listKiThi = [];
  listLopHoc = [];

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
    this.cauHoiService.getListKyThi().subscribe(data => {
      this.listKiThi = data;
      this.listKiThi.unshift({
        value: 'Tất cả',
        id: 0
      });
    });
    this.cauHoiService.getListLopHoc().subscribe(data => {
      this.listLopHoc = data;
      this.listLopHoc.unshift({
        value: 'Tất cả',
        id: 0
      });
    });
  }

  clearFilter() {
    this.selectedMonHoc = undefined;
    this.selectedLopThi = undefined;
    this.selectedKyThi = undefined;
  }

  viewDeThi(id: number, sode: number) {
    this.cauHoiService.getDeThiDetail(id).subscribe((data: any) => {
      data.cauHois = data.cauHoi;
      data.soDe = sode;
      delete data.cauHoi;
      this.cauHoiService.viewDeThi(data).subscribe(response => {
        const file = new Blob([response], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        const win = window.open();
        win.document.write(`<body><object
              data="${fileURL}" type="application/pdf" width="100%" height="100%">
            </object></body>`);
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
      kyThiId: this.selectedKyThi?.id,
      namKyThi: 0,
      monHocId: this.selectedMonHoc,
      lopHocId: this.selectedLopThi?.id
    };
    Object.keys(filter).forEach(key => !filter[key] && delete filter[key])
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
    console.log('---------', this.selectedMonHoc)
    this.loadDeThi({first: 0});
  }
}

