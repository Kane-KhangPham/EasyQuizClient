import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {BaseService} from '../services/base.service';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private baseService: BaseService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('loginUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const url = '/user/login';
    const data = {
      username: username,
      password: password
    }
    return this.baseService.post(url, data)
      .pipe(map(user => {
      localStorage.setItem('loginUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }))
  }

  logout() {
    localStorage.removeItem('loginUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated() {
    return !!this.currentUserValue;
  }
}
