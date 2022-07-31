import {FormGroup} from "@angular/forms";

export const confirmEmailValidator = () => {
  return (formGroup: FormGroup) => {
    const pass = formGroup.get('password');
    const verifyPass = formGroup.get('password_confirm');
    return pass?.value === verifyPass?.value ? null : {confirmEmailValidator: true};
  };
}
