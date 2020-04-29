import {Component, OnInit} from '@angular/core';
import {AuthService, UserResponse} from '../shared/auth/auth.service';
import {ToastMessageService} from '../shared/services/toast-message.service';
import {CauHoiService} from '../Home/ngan-hang-cau-hoi/cau-hoi.service';

export class User {
  accountName: string;
  giaoVienName: string;
  oldPass: string;
  newPass: string;
  reNewPass: string;
}

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  isChangePass = false
  invalidPassword = false;
  notMatchPass = false;
  account: User = new User();

  constructor(private messageService: ToastMessageService,
              private _service: CauHoiService,
              private authentSevice: AuthService) {
  }

  ngOnInit(): void {
    const currentuser = localStorage.getItem('loginUser');
    if (currentuser) {
      const data: UserResponse = JSON.parse(currentuser);
      this.account.accountName = data.accountName;
      this.account.giaoVienName = data.fullname;
    }
  }

  changePassword() {
    if (!this.isChangePass) {
      this.isChangePass = true;
    } else {
      if (this.account.newPass !== this.account.reNewPass) {
        this.notMatchPass = true;
        return;
      }
      const data = JSON.parse(JSON.stringify(this.account));
      delete data.reNewPass;
      delete data.giaoVienName;
      this._service.changePassword(data).subscribe(
        res => {
          if (res.success) {
            this.messageService.success('Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại');
            this.isChangePass = false;
            setTimeout(() => {
              this.authentSevice.logout();
            }, 500);
          } else {
            if (res.data.invalidPassword) {
              this.invalidPassword = true;
            } else {
              this.messageService.error(res.message);
            }
          }
        }, (error) => {
          this.messageService.error('Lỗi server');
        }
      );
    }
  }

  cancel() {
    this.isChangePass = false;
  }

  focusNewPass() {
    this.notMatchPass = false;
  }

  focusOldPass() {
    this.invalidPassword = false;
  }
}
