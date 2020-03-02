import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  get isInvalidFormLogin() {
    return this.loginForm.invalid;
  }

  login() {
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.toastr.success('Đăng nhập thành công')
          console.log('Đăng nhập thành công');
          this.router.navigate(['full-layout']);
        },
        error => {
          if (error.status) {
            // this.toastr.error('Tài khoản hoặc mật khẩu không đúng');
            console.log('Đăng nhập thành công');
          } else {
            console.log('Đăng nhập thành công');
            // this.toastr.error('Lỗi hệ thống');
          }
        }
      )
  }

}
