import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {Question} from '../../shared/Model/Question';
import {map} from 'rxjs/operators';
import {SelectItem} from 'primeng';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ObjectReference} from '../../shared/Model/DeThi';

@Injectable({
  providedIn: 'root'
})
export class CauHoiService {

  constructor(private baseService: BaseService, private http: HttpClient) { }

  getListCauHoi(page: number, pageSize: number, monHocId: number = 0, keyword: string = '') {
    const url = '/question/getListQuestion';
    const params = {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        monHoc: monHocId.toString(),
        keyword: keyword
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

  createMonHoc(tenMonHoc: string) {
    const  url = '/question/createMonHoc';
    const data = {
      id: 0,
      name: tenMonHoc
    };
    return this.baseService.post(url, data);
  }

  updateMonHoc(data: any) {
    const  url = '/question/updateMonHoc';
    return this.baseService.post(url, data);
  }

  deleteMonHoc(id: number) {
    const url = `/question/deleteMonHoc/${id}`
    return this.baseService.deleteRequest(url);
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

  viewDeThi(data: any): Observable<any | Response> {
    const url = '/dethi/viewDeThi1';
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
      //'responseType'  : 'blob' as 'json'        //This also worked
    };
   return this.http.post(this.baseService.convertUrlRequest(url), data, httpOptions);
  }

  /**
   * Lấy danh sách kì thi
   */
  getListKyThi(): Observable<ObjectReference[]> {
    const url = '/dethi/getListKyThi';
    return this.baseService.getRequest(url);
  }

  /**
   * Lấy danh sách lớp học
   */
  getListLopHoc(): Observable<ObjectReference[]> {
    const url = '/dethi/getListLopHoc';
    return this.baseService.getRequest(url);
  }

  /**
   * Lấy danh sách môn học
   */
  getListMonHoc(page = 1, pageSize = 25, keyword = ''): Observable<any> {
    const url = '/question/getListMonHoc';
    const params = {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        keyword: keyword
      }
    };
    return this.baseService.getRequest(url, params);
  }

  /**
   * lấy danh sách suggestion môn học theo keyword
   */
  suggestionMonHoc(filter: string): Observable<ObjectReference[]> {
    const url = `/dethi/getListMonHoc?filter=${filter}`;
    return this.baseService.getRequest(url);
  }

  /**
   * Lưu đề thi
   * @param data
   */
  saveDeThi(data) {
    const url = '/dethi/createDeThi';
    return this.baseService.post(url, data);
  }

  /**
   * Lấy danh sách đề thi
   * @param filter
   */
  getListDeThi(filter) {
    const url = '/dethi/getListDeThi';
    const data = {
      params: filter
    };
    return this.baseService.getRequest(url, data);
  }

  /**
   * Get de thi detail
   * @param id
   */
  getDeThiDetail(id: number): Observable<ObjectReference[]> {
    const url = `/dethi/${id}`;
    return this.baseService.getRequest(url);
  }

  /**
   * Update đề thi
   * @param data
   */
  updateDeThi(data) {
    const url = '/dethi/updateDeThi';
    return this.baseService.post(url, data);
  }

  getListGiaoVien(page = 1, pageSize = 25, keyword = '', khoaId?: number): Observable<any> {
    const url = '/question/getListGiaoVien';
    let params;
    if(khoaId) {
      params = {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
          keyword: keyword,
          khoaId : khoaId
        }
      };
    } else {
      params = {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
          keyword: keyword
        }
      };
    }
    return this.baseService.getRequest(url, params);
  }

  createGiaoVien(tenGiaoVien: string, khoaId: number) {
    const  url = '/question/createGiaoVien';
    const data = {
      id: 0,
      name: tenGiaoVien,
      khoaId: khoaId
    };
    return this.baseService.post(url, data);
  }

  updateGiaoVien(data: any) {
    const  url = '/question/updateGiaoVien';
    return this.baseService.post(url, data);
  }

  deleteGiaoVien(id: number) {
    const url = `/question/deleteGiaoVien/${id}`
    return this.baseService.deleteRequest(url);
  }

  getListKhoaLookup() {
    const url = '/question/getListKhoa';
    return this.baseService.getRequest(url);
  }

  createAccount(data: any) {
    const  url = '/question/createAccount';
    return this.baseService.post(url, data);
  }

  getListAccount(page: number, pageSize: number, keyword: string = '') {
    const url = '/question/getListAccount';
    const params = {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        keyword: keyword
      }
    };
    return this.baseService.getRequest(url, params);
  }

  changePassword(data) {
    const  url = '/question/changePassword';
    return this.baseService.post(url, data);
  }
}
