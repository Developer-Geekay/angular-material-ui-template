import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Password Match Validation form level Validation
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return {
    mismatchPassword: !(
      password &&
      confirmPassword &&
      password.value === confirmPassword.value
    ),
  };
};

// Password Match Validation control level Validation
export const passwordMisMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.root.get('password');
  const confirmPassword = control;
  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { mismatchPassword: true };
};
