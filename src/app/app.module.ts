import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat'
//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CheckMailComponent } from './components/check-mail/check-mail.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterUserComponent,
    CheckMailComponent,
    RecoverPasswordComponent,
    SpinnerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
