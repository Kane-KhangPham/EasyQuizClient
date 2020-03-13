import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { HomeComponent } from './Home/home.component';
import { Home_Routes } from './shared/routes/home.routes';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'de-thi',
    pathMatch: 'full',
  },
  { path: '', component: HomeComponent, children: Home_Routes, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
