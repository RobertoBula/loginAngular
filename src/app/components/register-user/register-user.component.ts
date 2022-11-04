import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  registerUser: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.registerUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const repeatPassword = this.registerUser.value.repeatPassword;

    if (password !== repeatPassword) {
      Swal.fire('Las contraseñas no coinciden!');
      return;
    }
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(this.firebaseError(error.code), 'Ups!');
      });
  }

  firebaseError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este usuario ya existe!';
      case 'auth/weak-password':
        return 'La contraseña es muy debil.';
      case 'auth/invalid-email':
        return 'El correo es inválido.';
      default:
        return 'Error desconocido';
    }
  }
}
