import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './shared/auth/auth.service';
import { BaseService } from './shared/services/base.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Home/home.component';
import { AppNavComponent } from './Home/app-nav/app-nav.component';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule, ConfirmationService, MenuModule, MessageService, OverlayPanelModule, ToastModule} from 'primeng';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import {JwtModule} from '@auth0/angular-jwt';
export function tokenGetter() {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppNavComponent,
    AccountSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
    MenuModule,
    OverlayPanelModule,
    ButtonModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [
    AuthService,
    BaseService,
    AuthGuard,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
