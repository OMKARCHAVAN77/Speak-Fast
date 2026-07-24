

import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RegistrationValidator {

  static noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null; // Let required validator handle empty values
    }

    return value.includes(' ')
      ? { noSpace: true }
      : null;
  }


static password(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Rules:
    // - Minimum 8 characters
    // - First character must be uppercase
    // - At least one lowercase letter
    // - At least one number
    // - At least one special character
    const passwordRegex =
      /^(?=.{8,}$)[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=]).*$/;

    return passwordRegex.test(value)
      ? null
      : { password: true };
  }


  static passwordChecking(control: AbstractControl): ValidationErrors | null {

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({
        ...confirmPassword.errors,
        passwordChecking: true
      });
    } else if (confirmPassword.hasError('passwordChecking')) {
      const errors = { ...confirmPassword.errors };
      delete errors['passwordChecking'];

      confirmPassword.setErrors(
        Object.keys(errors).length ? errors : null
      );
    }

    return null;
  }

  static mobileNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    return /^\d{10}$/.test(value)
      ? null
      : { mobileNumber: true };
  }

  static numberOnly(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    return /^\d+$/.test(value)
      ? null
      : {
          numberOnly: true
        };
  }

    static isEmailCorrect(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    return /^[a-z]+@[a-z]+\.com$/.test(value)
      ? null
      : {
          isEmailCorrect: true
        };
  }

}



