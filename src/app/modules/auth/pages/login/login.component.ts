import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "ecapture-ng-ui";
import {toastStyle} from "@app/utils/styles/styles";
import {Subscription} from "rxjs";
import {AuthService} from "@app/modules/auth/services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Login} from "@app/modules/auth/models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public readonly toastStyle = toastStyle;
  private _subscriptions: Subscription = new Subscription();
  public isBlockPage: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _messageService: ToastService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = _fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
  }

  public requestLogin(): void {
    if (this.loginForm.valid) {
      const data: Login = {
        password: this.loginForm.get('password')?.value.toString().trim(),
        nickname: this.loginForm.get('userName')?.value.toString().trim(),
      }
      this._subscriptions.add(
        this._authService.login(data).subscribe({
          next: async (resp) => {
            if (resp.error) {
              this._messageService.add({type: 'error', message: resp.msg, life: 5000});
            } else {
              this._authService.saveToken(resp.data);
              await this._router.navigate(['explorer']);
            }
            this.isBlockPage = false;
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            this.isBlockPage = false;
            this._messageService.add({
              type: 'error',
              message: 'Hubo un error al autenticarse, intente de nuevo!',
              life: 5000
            });
          }
        }));
    } else {
      this._messageService.add({
        type: 'warning',
        message: 'Complete correctamente todos los campos del formulario',
        life: 5000
      });
      this.loginForm.markAllAsTouched();
    }
  }

}
