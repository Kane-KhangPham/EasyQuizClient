import { Injectable } from '@angular/core';
import {BaseService} from '../services/base.service';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {
  constructor(private baseService: BaseService,
              private router: Router) {
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
        localStorage.setItem('jwt', user.token);
        return user;
    }));
  }

  logout() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    const token: string = localStorage.getItem('jwt');
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}

export interface UserResponse {
  id: number;
  fullname: string;
  token: string;
  accountName: string;
}
