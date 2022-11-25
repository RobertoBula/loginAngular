import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  registerUser: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseError: FirebaseErrorService
  ) {
    this.registerUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;

    if (password !== repeatPassword) {
      Swal.fire('Las contraseñas no coinciden!', 'Ups!');
      return;
    }
    this.loading = true;
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.checkMail();
      })
      .catch((error) => {
        this.loading = false;

        console.log(error);
        Swal.fire(this.firebaseError.firebaseError(error.code), 'Ups!');
      });
  }

  checkMail() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        Swal.fire(
          'Usuario creado con éxito!',
          'Por favor verifique su correo electronico para poder acceder a la aplicación',
          'success'
        )
        this.router.navigate(['/login']);
      });
  }
}
