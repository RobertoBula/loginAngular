import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckMailComponent } from './components/check-mail/check-mail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'check-mail', component: CheckMailComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
