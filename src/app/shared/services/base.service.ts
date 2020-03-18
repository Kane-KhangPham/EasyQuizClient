import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const CONTENT_TYPE = 'application/json';
@Injectable()
export class BaseService {

  constructor(private http: HttpClient, ) { }

  public convertUrlRequest(query: string): string {
    return `${'http://localhost:5000/api'}${query}`;
  }

  private getHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', CONTENT_TYPE);
    headers.append('Accept', CONTENT_TYPE);
    return {
      headers: headers
    };
  }

  post(url: string, body: any): Observable<any | Response> {
    return this.http.post(this.convertUrlRequest(url), body, this.getHeaders());
  }

  getRequest(urlRequest: string, requestOptions?: any): Observable<any | Response> {
    return this.http.get(this.convertUrlRequest(urlRequest), requestOptions);
  }

  deleteRequest(url: string) : Observable<any | Response> {
    return this.http.delete(this.convertUrlRequest(url), this.getHeaders());
  }
}

