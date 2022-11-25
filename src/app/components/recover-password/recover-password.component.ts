import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent implements OnInit {
  recoverPassword: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firebaseError: FirebaseErrorService
  ) {
    this.recoverPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  recover() {
    const email = this.recoverPassword.value.email;

    this.loading = true;
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        Swal.fire('Por favor Revise su bandeja de entrada')
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        Swal.fire(this.firebaseError.firebaseError(error.code), 'Ups!');
        this.loading = false;
      });
  }
}
