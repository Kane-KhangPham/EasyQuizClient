import {Component, OnInit} from '@angular/core';
import {SelectItem, SelectItemGroup} from 'primeng';
import {Question} from '../../shared/Model/Question';
import {CauHoiService} from './cau-hoi.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ngan-hang-cau-hoi',
  templateUrl: './ngan-hang-cau-hoi.component.html',
  styleUrls: ['./ngan-hang-cau-hoi.component.css']
})
export class NganHangCauHoiComponent implements OnInit {
  displayCreateModal: boolean;
  listMonHoc: SelectItem[];
  listGiaoVien: SelectItem[];
  listCauHoi: any[] = [];
  selectedMonHoc: string;
  selectedGiaoVien: string;
  pageSize = 25;
  totalRow = 0;

  createForm: FormGroup;
  constructor(private cauHoiService: CauHoiService,
              private buider: FormBuilder) { }

  ngOnInit(): void {
    this.getListcauHoi();
    this.getLookupData();
    this.initForm();
  }

  getLookupData() {
    this.cauHoiService.getSubjectLookup().subscribe(
      response => this.listMonHoc = response);
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

  initForm() {
    this.createForm = this.buider.group({
      subject: ['', Validators.required],
      question: ['', Validators.required],
      optionA: ['', Validators.required],
      optionB: ['', Validators.required],
      optionC: ['', Validators.required],
      optionD: ['', Validators.required]
    });
  }

  saveQuestion() {
    // validate data
    if(this.createForm.invalid) {
      return;
    }
    console.log('Form data', this.createForm.getRawValue());
    this.createForm.reset();
    this.displayCreateModal = false;
  }
}
