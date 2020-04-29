import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {MenuItem} from 'primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
  items: MenuItem[];
  constructor(private authentService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.items = [{
      label: 'Cài đặt',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        const user = JSON.parse(localStorage.getItem('loginUser'));
        if (user) {
          this.router.navigate([`/de-thi/account-setting/${user.id}`]);
        }
      }
    },
      {
        label: 'Đăng xuất',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];
  }

  logout() {
    this.authentService.logout();
  }

}
