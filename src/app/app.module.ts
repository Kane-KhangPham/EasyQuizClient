import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './shared/auth/auth.service';
import { BaseService } from './shared/services/base.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Home/home.component';
import { AppNavComponent } from './Home/app-nav/app-nav.component';
import {DropdownModule} from 'primeng/dropdown';
import {MessageService, ToastModule} from 'primeng';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule
  ],
  providers: [
    AuthService,
    BaseService,
    AuthGuard,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
