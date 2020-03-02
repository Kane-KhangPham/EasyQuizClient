import { Injectable } from '@angular/core';
import {BaseService} from '../services/base.service';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private baseService: BaseService,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('loginUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserResponse {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<UserResponse> {
    const url = '/user/login';
    const data = {
      username,
      password
    };
    return this.baseService.post(url, data)
      .pipe(map((user: UserResponse) => {
      localStorage.setItem('loginUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('loginUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    // if (!!this.currentUserValue) {
    //   const token = this.currentUserValue.token;
    //   if (jwtHelper.isTokenExpired(token)) {
    //     localStorage.removeItem('loginUser');
    //     return false;
    //   }
    //   return true;
    // }
    // return false;
    return true;
  }
}

export interface UserResponse {
  id: number;
  fullname: string;
  token: string;
}
