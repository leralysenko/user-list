import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
  } from '@angular/forms';

  export function confirmPasswordValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
          return { PasswordNoMatch: true };
      } else {
          return null;
      }
  }
  }