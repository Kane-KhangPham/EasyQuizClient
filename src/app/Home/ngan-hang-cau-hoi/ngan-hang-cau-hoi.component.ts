import {Component, OnInit} from '@angular/core';
import {SelectItemGroup} from 'primeng';
import {Question} from '../../shared/Model/Question';

@Component({
  selector: 'app-ngan-hang-cau-hoi',
  templateUrl: './ngan-hang-cau-hoi.component.html',
  styleUrls: ['./ngan-hang-cau-hoi.component.css']
})
export class NganHangCauHoiComponent implements OnInit {
  displayCreateModal: boolean;
  listMonHoc: SelectItemGroup[];
  selectedMonHoc: string;
  cars: Question[] = [
    {
      id: 1,
      question: 'Day la cau hoi 1',
      optionA: 'Dap an A',
      optionB: 'Dap an B',
      optionC: 'Dap an C',
      optionD: 'Dap an D',
      tenMonHoc: 'Toán'
    },
    {
      id: 2,
      question: 'Day la cau hoi 2',
      optionA: 'Dap an A',
      optionB: 'Dap an B',
      optionC: 'Dap an C',
      optionD: 'Dap an D',
      tenMonHoc: 'Toán'
    }
  ];

  ngOnInit(): void {
  }

  search() {

  }

  showCreateModal() {
    this.displayCreateModal = true;
  }
}
