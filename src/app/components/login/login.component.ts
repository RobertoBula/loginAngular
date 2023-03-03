import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseError: FirebaseErrorService
  ) {
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.loading = true;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.user?.emailVerified) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicio de sesion exitoso',
            showConfirmButton: false,
            timer: 1000
          })
          this.router.navigate(['/dashboard']);
        }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Verifique su correo',
            showConfirmButton: false,
            timer: 1000
          })
          this.router.navigate(['/check-mail'])
        }
      })
      .catch((error) => {
        Swal.fire(this.firebaseError.firebaseError(error.code), 'Ups!');
        this.loading = false;
      });
  }

  loginGoogle(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(()=>{
      this.router.navigate(['/dashboard'])
    }).catch((error)=>{
      Swal.fire(this.firebaseError.firebaseError(error.code), 'Ups!');
    })
  }
}
