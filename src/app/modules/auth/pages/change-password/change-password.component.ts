import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from "rxjs";
import { AuthService } from '@app/modules/auth/services/auth.service';
import {DropdownModel, ToastService} from "ecapture-ng-ui";
import {Router} from "@angular/router";
import {onlyLetters, onlyNumbers} from "@app/helpers/helpers";
import { ChangePasswordRequest } from '@app/modules/auth/models/changePassword';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm : FormGroup;
  public usernameValidatorsValue = new Subject<string>();
  public emailValidatorsValue = new Subject<string>();
  public passwordValidatorsValue = new Subject<string>();
  public invalidName: boolean = false;
  public invalidEmail: boolean = false;
  public isValidCode: boolean = true;
  private _subscriptions: Subscription = new Subscription();
  public pageRecovery: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private _messageService: ToastService,
    private _authService: AuthService
  ) { 
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['',[Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword:['', [Validators.required, Validators.email]]
    });
    this.passwordValidatorsValue.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(
      (value) => {
        this.validatePassword();
      },
    );
  }
  public onlyNumber = (value: any) => onlyNumbers(value);

  public onlyLetters = (value: KeyboardEvent) => onlyLetters(value);

  public changePassword() : void {
    const params = this.buildParamsRecovery();
    console.log("Params to send", params);
    if (this.changePasswordForm.valid) {
      console.log("Paswd");
      
        this._subscriptions.add(
        this._authService.changePassword(params).subscribe(
          (res) => {
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
            } else {
              this._messageService.add({type: 'error', message: 'Le hemos enviado un correo para que pueda confirmar su cuenta.', life: 5000});
            }
          },
          () => {
            this._messageService.add({type: 'error', message: 'Conexión perdida con el Servidor!', life: 5000});
          })
        );
    } else {
      console.log("error");

      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000});
      this.changePasswordForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
  }
  public save():  void{
    console.log("SAVING");
  }
  private buildParamsRecovery() : ChangePasswordRequest {
    return {
      OldPassword: this.changePasswordForm.get("oldPassword")?.value,
      NewPassword:this.changePasswordForm.get("password")?.value,
      ConfirmPassword:this.changePasswordForm.get("confirmPassword")?.value
    };
  }
  private validatePassword(): boolean {
    if(this.changePasswordForm.get("password")?.value === this.changePasswordForm.get("confirmPassword")?.value)return true;
    else return false;
  }
}
