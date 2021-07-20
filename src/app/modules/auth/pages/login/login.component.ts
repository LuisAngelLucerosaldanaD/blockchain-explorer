import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LoginService} from "@app/modules/auth/services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  public form: FormGroup;
  public isChangeBtn: boolean;
  public messageToast: any;
  public successToast: any;
  public errorToast: any;
  public warningToast: any;

  public appStore$: any;
  public token: string;
  public user: any;
  public isLogged: boolean;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    // private appStore: Store<{ app: any }>
  ) {
    this.token = '';
    this.isLogged = false;
    this.form = this.fb.group({
      email: ['', [Validators.minLength(4), Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      nickname: ['']
    });
    this.isChangeBtn = true;
    this.successToast = {
      type: 'success',
      message: 'Atenticado Exisotsamente.',
      life: 5000,
      summary: 'Success'
    };
    this.warningToast = {
      type: 'warning',
      message: 'Rellene todos los campos por favor!',
      life: 5000,
      summary: 'Alerta'
    };
    this.errorToast = {
      type: 'error',
      message: 'Se ha producido un error, contactese con el administrador.',
      life: 5000,
      summary: 'Error'
    };
    /*this.subscription.add(appStore.select('app').subscribe(state => {
      this.appStore$ = state;
    }));*/
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public login(): void {
    if (this.form.valid) {
      this.subscription.add(
        this.loginService.login(this.form.value).subscribe(async (resp: any) => {
            if (!resp.error) {
              await this.router.navigate(['dashboard']);
              this.messageToast = this.successToast;
              this.isLogged = true;
              this.token = resp.data.access_token;
              this.user = this.loginService.getUserByToke();
              const data = {
                isLogged: this.isLogged,
                token: this.token,
                user: this.user
              };
              // this.appStore.dispatch(updateSession({dataValue: data}));
            } else {
              this.messageToast = this.errorToast;
            }
          },
          () => {
            this.messageToast = this.errorToast;
          })
      );
    } else {
      this.messageToast = this.warningToast;
    }
  }

  public getMessageEmailError(): string {
    let message: string;
    // @ts-ignore
    if (this.form.get('email').hasError('minlength')) {
      message = 'El email no cuenta con la cantidad de caracteres minimos requeridos.';
      // @ts-ignore
    } else if (this.form.get('email').hasError('required')) {
      message = 'El email es requerido.';
      // @ts-ignore
    } else if (this.form.get('email').hasError('email')) {
      message = 'El dato ingresado no es un correo electrónico.';
    }
    // @ts-ignore
    return message;
  }

  public getMessagePasswordError(): string {
    let message: string;
    // @ts-ignore
    if (this.form.get('password').hasError('minLength')) {
      message = 'La contraseña no cuenta con la cantidad de caracteres minimos requeridos.';
      // @ts-ignore
    } else if (this.form.get('password').hasError('required')) {
      message = 'La contraseña es requerida.';
      // @ts-ignore
    } else if (this.form.get('password').hasError('maxLength')) {
      message = 'La contraseña no cuenta con la cantidad de caracteres maximos requeridos.';
    }
    // @ts-ignore
    return message;
  }

  public getMessageNicknameError(): string {
    let message: string;
    // @ts-ignore
    if (this.form.get('nickname').hasError('minLength')) {
      message = 'El nombre de usuario no cuenta con la cantidad de caracteres minimos requeridos.';
      // @ts-ignore
    } else if (this.form.get('nickname').hasError('required')) {
      message = 'El nombre de usuario es requerido.';
      // @ts-ignore
    } else if (this.form.get('nickname').hasError('maxLength')) {
      message = 'El nombre de usuarioa no cuenta con la cantidad de caracteres maximos requeridos.';
    }
    // @ts-ignore
    return message;
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
    // @ts-ignore
    return this.form.get('password');
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
      // @ts-ignore
      this.form.get('nickname').setValue('');
      this.form.controls.email.setValidators([Validators.minLength(4), Validators.required, Validators.email]);
      this.form.controls.email.updateValueAndValidity();
      this.form.controls.nickname.clearValidators();
      this.form.controls.nickname.updateValueAndValidity();
    } else {
      // @ts-ignore
      this.form.get('email').setValue('');
      this.form.controls.nickname.setValidators([Validators.required, Validators.maxLength(10), Validators.minLength(4)]);
      this.form.controls.nickname.updateValueAndValidity();
      this.form.controls.email.clearValidators();
      this.form.controls.email.updateValueAndValidity();
    }
  }

}
