import {Component, OnInit} from '@angular/core';
import {SelectItemGroup} from 'primeng';

@Component({
  selector: 'app-ngan-hang-cau-hoi',
  templateUrl: './ngan-hang-cau-hoi.component.html',
  styleUrls: ['./ngan-hang-cau-hoi.component.css']
})
export class NganHangCauHoiComponent implements OnInit {
  listMonHoc: SelectItemGroup[];
  selectedMonHoc: string;

  ngOnInit(): void {
  }
}
