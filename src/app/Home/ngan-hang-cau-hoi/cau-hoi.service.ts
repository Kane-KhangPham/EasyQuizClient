import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Question} from '../../shared/Model/Question';

@Injectable({
  providedIn: 'root'
})
export class CauHoiService {

  constructor(private baseService: BaseService) { }

  getListCauHoi(page: number, pageSize: number, monHocId: number = 0, nguoiTao: number = 0) {
    const url = '/question/getListQuestion';
    const params = {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        monHoc: monHocId.toString(),
        giaoVien: nguoiTao.toString()
      }
    };
    return this.baseService.getRequest(url, params);
  }

  createQuestion(data: Question) {
    const  url = '/question/createQuestion';
    return this.baseService.post(url, data);
  }
}
