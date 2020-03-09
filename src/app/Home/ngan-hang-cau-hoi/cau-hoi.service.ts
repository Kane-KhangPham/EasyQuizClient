import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Question} from '../../shared/Model/Question';
import {map} from 'rxjs/operators';
import {SelectItem} from 'primeng';

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

  /**
   * Thêm mới câu hỏi
   * @param data
   */
  createQuestion(data: Question) {
    const  url = '/question/createQuestion';
    return this.baseService.post(url, data);
  }

  /**
   * Lấy danh sách môn học lookup
   */
  getSubjectLookup() {
    const url = '/question/getListMonHocLookup';
    return this.baseService.getRequest(url).pipe(
      map(res => {
        return res.map( item => {
          return {
              label: item.value,
              value: item.id
          } as SelectItem
        })
      })
    );
  }

  /**
   * Xoá câu hỏi
   * @param questionId
   */
  deleteQuestion(questionId: number) {
    const url = `/question/deleteQuestion/${questionId}`;
    return this.baseService.deleteRequest(url);
  }

  /**
   * Cập nhật câu hỏi
   * @param data
   */
  updateQuestion(data: any) {
    const url = '/question/updateQuestion';
    return this.baseService.post(url, data);
  }
}
