import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LoginService} from "@app/modules/auth/services/login.service";
import {ToastStyleModel} from "ecapture-ng-ui/lib/modules/toast/model/toast.model";
import {toastDataStyle} from "@app/utils/constants/data";
import {ToastService} from "ecapture-ng-ui";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  public form: FormGroup;
  public isChangeBtn: boolean;
  public readonly toastStyle: ToastStyleModel = toastDataStyle;
  public isBlockPage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _messageService: ToastService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.minLength(4), Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nickname: ['']
    });
    this.isChangeBtn = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.isBlockPage = false;
  }

  public login(): void {
    if (this.form.valid) {
      this.isBlockPage = true;
      this.subscription.add(
        this.loginService.login(this.form.value).subscribe(async (resp) => {
            if (resp.error) {
              this._messageService.add({type: 'error', message: resp.msg, life: 5000});
            } else {
              await this.router.navigate(['dashboard']);
              this.loginService.saveToken(resp.data);
            }
            this.isBlockPage = false;
          },
          () => {
            this.isBlockPage = false;
            this._messageService.add({type: 'error', message: 'Conexión perdida con el servidor!', life: 5000});
          })
      );
    } else {
      this._messageService.add({type: 'warning', message: 'Complete correctamente todos los campos', life: 5000});
    }
  }

  public getMessageEmailError(): string {
    if (this.form.get('email')?.hasError('minlength')) {
      return  'El email no cuenta con la cantidad de caracteres minimos requeridos.';
    } else if (this.form.get('email')?.hasError('required')) {
      return  'El email es requerido.';
    } else if (this.form.get('email')?.hasError('email')) {
      return  'El dato ingresado no es un correo electrónico.';
    }
    return '';
  }

  public getMessagePasswordError(): string {
    if (this.form.get('password')?.hasError('minLength')) {
      return  'La contraseña no cuenta con la cantidad de caracteres minimos requeridos.';
    } else if (this.form.get('password')?.hasError('required')) {
      return  'La contraseña es requerida.';
    } else if (this.form.get('password')?.hasError('maxLength')) {
      return  'La contraseña no cuenta con la cantidad de caracteres maximos requeridos.';
    }
    return '';
  }

  public getMessageNicknameError(): string {
    if (this.form.get('nickname')?.hasError('minLength')) {
      return  'El nombre de usuario no cuenta con la cantidad de caracteres minimos requeridos.';
    } else if (this.form.get('nickname')?.hasError('required')) {
      return 'El nombre de usuario es requerido.';
    } else if (this.form.get('nickname')?.hasError('maxLength')) {
      return 'El nombre de usuarioa no cuenta con la cantidad de caracteres maximos requeridos.';
    }
    return '';
  }

  get nicknameField(): AbstractControl {
    return <AbstractControl>this.form.get('nickname');
  }

  get emailField(): AbstractControl {
    return <AbstractControl>this.form.get('email');
  }

  get passwordField(): AbstractControl {
    return <AbstractControl>this.form.get('password');
  }

  get formValid(): AbstractControl {
    return <AbstractControl>this.form.get('password');
  }

  get nicknameFieldIsValid(): boolean {
    return this.nicknameField.touched && this.nicknameField.valid;
  }

  get emailFieldIsValid(): boolean {
    return this.nicknameField.touched && this.emailField.valid;
  }

  get passwordFieldIsValid(): boolean {
    return this.passwordField.touched && this.passwordField.valid;
  }

  public changeTypeInput(value: boolean): void {
    if (value) {
      this.form.get('nickname')?.setValue('');
      this.form.controls.email.setValidators([Validators.minLength(4), Validators.required, Validators.email]);
      this.form.controls.email.updateValueAndValidity();
      this.form.controls.nickname.clearValidators();
      this.form.controls.nickname.updateValueAndValidity();
    } else {
      this.form.get('email')?.setValue('');
      this.form.controls.nickname.setValidators([Validators.required, Validators.maxLength(10), Validators.minLength(4)]);
      this.form.controls.nickname.updateValueAndValidity();
      this.form.controls.email.clearValidators();
      this.form.controls.email.updateValueAndValidity();
    }
  }

}
