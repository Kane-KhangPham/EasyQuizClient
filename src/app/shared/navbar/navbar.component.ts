import {Component,  OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(private authentService: AuthService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  logout() {
    this.authentService.logout();
  }
}
