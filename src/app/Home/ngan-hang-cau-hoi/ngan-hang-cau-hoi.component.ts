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
  isCreate = true;
  selectedQuestion = null;

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
    this.isCreate = true;
    this.displayCreateModal = true;
  }

  paginate($event) {

  }

  initForm() {
    this.createForm = this.buider.group({
      subject: [null, Validators.required],
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
    let data;
    if(this.isCreate) {
      data = this.createForm.getRawValue();
      data.monHocId = data.subject;
      delete data.subject;
      this.cauHoiService.createQuestion(data).subscribe(res => {
        //to-do: thong bao thanh cong;
        this.createForm.reset();
        this.displayCreateModal = false;
        this.getListcauHoi();
      })
    } else {
      const fieldMapping = ['optionA', 'optionB', 'optionC', 'optionD'];
      data = this.createForm.getRawValue();
      const postData: any = {};
      postData.monHocId = data.subject;
      postData.question = data.question;
      postData.id = this.selectedQuestion.id;
      postData.options = this.selectedQuestion.options.map((item, index) => {
        item.value = data[fieldMapping[index]];
        delete item.content;
        return item;
      })

      this.cauHoiService.updateQuestion(postData).subscribe(res => {
        //to-do: thong bao thanh cong;
        this.createForm.reset();
        this.displayCreateModal = false;
        this.getListcauHoi();
      })
    }
  }

  deleteQuestion(questionId: number) {
    this.cauHoiService.deleteQuestion(questionId)
      .subscribe(res => {
        if(res.success) {
          this.getListcauHoi();
        } else {
          // to-do show toast message
        }
      })
  }

  editQuestion(question: any) {
    this.selectedQuestion = question;
    this.isCreate = false;
    var bindFormData = {
      subject: this.listMonHoc.find(x => x.label === question.monHoc)?.value,
      question: question.content,
      optionA: question.options[0].content,
      optionB: question.options[1].content,
      optionC: question.options[2].content,
      optionD: question.options[3].content
    }

    this.createForm.patchValue(bindFormData);
    this.displayCreateModal = true;
  }
}
