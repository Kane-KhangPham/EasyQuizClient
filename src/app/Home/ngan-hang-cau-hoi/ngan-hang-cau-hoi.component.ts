import {Component, OnInit} from '@angular/core';
import {SelectItemGroup} from 'primeng';
import {Question} from '../../shared/Model/Question';
import {CauHoiService} from './cau-hoi.service';

@Component({
  selector: 'app-ngan-hang-cau-hoi',
  templateUrl: './ngan-hang-cau-hoi.component.html',
  styleUrls: ['./ngan-hang-cau-hoi.component.css']
})
export class NganHangCauHoiComponent implements OnInit {
  displayCreateModal: boolean;
  listMonHoc: SelectItemGroup[];
  listGiaoVien: SelectItemGroup[];
  listCauHoi: any[] = [];
  selectedMonHoc: string;
  selectedGiaoVien: string;
  pageSize = 25;
  totalRow = 0;
  constructor(private cauHoiService: CauHoiService ) { }

  ngOnInit(): void {
    this.getListcauHoi();
  }

  private getListcauHoi(page = 1, monHocId = 0, nguoiTao= 0){
    this.cauHoiService.getListCauHoi(page,this.pageSize, monHocId, nguoiTao)
      .subscribe( res => {
        this.listCauHoi = res.data;
        this.totalRow = res.totalRow;
      })
  }

  search() {

  }

  showCreateModal() {
    this.displayCreateModal = true;
  }

  paginate($event) {

  }
}
