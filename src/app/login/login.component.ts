import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth/auth.service';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public toastr: ToastrService,
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
          this.toastr.success('Đăng nhập thành công')
          this.router.navigate(['full-layout']);
        },
        error => {
          if (error.status) {
            this.toastr.error('Tài khoản hoặc mật khẩu không đúng');
          } else {
            this.toastr.error('Lỗi hệ thống');
          }
        }
      )
  }

  // // On Forgot password link click
  // onForgotPassword() {
  //   this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  // }
  // // On registration link click
  // onRegister() {
  //   this.router.navigate(['register'], { relativeTo: this.route.parent });
  // }

}
