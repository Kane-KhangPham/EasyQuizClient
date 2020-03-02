import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {

  constructor(private authentService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authentService.logout();
  }

}
