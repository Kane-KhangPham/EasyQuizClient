import {Component, OnInit} from '@angular/core';
import {CauHoiService} from '../ngan-hang-cau-hoi/cau-hoi.service';
import {ToastMessageService} from '../../shared/services/toast-message.service';
import {ConfirmationService} from 'primeng';

export class Account {
  accountName: string;
  giaoVien: any;
  email: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  listMonHoc = [];
  pageSize = 25;
  totalRow: 0;
  loading: boolean;
  keyword: '';
  account = new Account();
  displayCreateModal = false;
  isCreate = false;
  listGiaoVien = [];

  constructor(private cauHoiService: CauHoiService,
              private confirmationService: ConfirmationService,
              private messageService: ToastMessageService) {
  }

  filterGiaoVien(event) {
    const query = event.query;
    this.cauHoiService.getListGiaoVien(1, 10, query).subscribe(res => {
      this.listGiaoVien = res.data;
    });
  }

  ngOnInit(): void {
    this.loading = true;
  }

  showCreateModal() {
    this.isCreate = true;
    this.displayCreateModal = true;
  }

  loadMonHocs($event) {
    const page = ($event.first / this.pageSize) + 1;
    this.getListMonHoc(page, this.keyword);
    this.loading = true;
  }

  search() {
    this.loadMonHocs({first: 0});
  }

  private getListMonHoc(page = 1, keyword: string = '') {
    this.cauHoiService.getListAccount(page, this.pageSize, keyword)
      .subscribe(res => {
        this.listMonHoc = res.data;
        this.totalRow = res.totalRow;
        this.loading = false;
      });
  }

  save() {
    // validate data
    if (!this.account.accountName || !this.account.giaoVien || !this.account.email) {
      this.messageService.warn('Vui lòng nhập đầy đủ thông tin')
      return;
    }
    const data = JSON.parse(JSON.stringify(this.account));
    data.giaoVienId = this.account.giaoVien.id;
    this.cauHoiService.createAccount(data).subscribe(res => {
      if (res.success) {
        this.messageService.success(res.message);
        this.account = new Account();
        this.displayCreateModal = false;
        this.getListMonHoc();
      } else {
        this.messageService.error(res.message);
      }
    });
  }
}

