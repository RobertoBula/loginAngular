import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  firebaseError(code: string) {
    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'Este usuario ya existe!';
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil.';
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'El correo es inválido.';
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe!';
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta.';
      default:
        return 'Error desconocido';
    }
  }
}
