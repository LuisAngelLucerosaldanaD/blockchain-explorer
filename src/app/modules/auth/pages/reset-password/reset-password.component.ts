import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from "rxjs";
import { AuthService } from '@app/modules/auth/services/auth.service';
import {DropdownModel, ToastService} from "ecapture-ng-ui";
import {Router} from "@angular/router";
import {onlyLetters, onlyNumbers} from "@app/helpers/helpers";
import { RecoveryPassword, DataPassword, Code} from '@app/modules/auth/models/recoveryAccount';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm : FormGroup;
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
    this.resetPasswordForm = this.formBuilder.group({
      codeCheck: ['',[Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_]+$')]],
      email:['', [Validators.required, Validators.email]]
    });
    this.passwordValidatorsValue.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(
      (value) => {
        // this.validatePassword(value);
      },
    );
  }
  public onlyNumber = (value: any) => onlyNumbers(value);

  public onlyLetters = (value: KeyboardEvent) => onlyLetters(value);

  public changePassword() : void {
    const params = this.buildParamsRecovery();
    console.log("Params to send", params);
    if (this.resetPasswordForm.valid || this.validatePassword()) {
      this._subscriptions.add(
        this._authService.resetPassword(params).subscribe(
          (res) => {
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
            } else {
              this._messageService.add({type: 'error', message: 'Procesado correctamente', life: 5000});
            }
          },
          () => {
            this._messageService.add({type: 'error', message: 'Conexión perdida con el Servidor!', life: 5000});
          })
      );
    } else {
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000});
      this.resetPasswordForm.markAllAsTouched();
    }
  }
  public checkCodeRecovery() : void {
    const dataCheckCode = {code: this.resetPasswordForm.get("codeCheck")?.value,};
    console.log("Params to send", dataCheckCode);
    if (dataCheckCode.code != '') {
        this._subscriptions.add(
        this._authService.checkCodeRecoveryPassword(dataCheckCode).subscribe(
          (res) => {
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
            } else {
              this._messageService.add({type: 'error', message: 'Procesado correctamente', life: 5000});
            }
          },
          () => {
            this._messageService.add({type: 'error', message: 'Conexión perdida con el Servidor!', life: 5000});
          })
        );
    } else {
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000});
      this.resetPasswordForm.markAllAsTouched();
    }
  } 
  ngOnInit(): void {
    let token = sessionStorage.getItem("access-token");
    if(!token){

    }
  }
  public save():  void{
    console.log("SAVING");
  }
  private buildParamsRecovery() : DataPassword {
    return {
      password:this.resetPasswordForm.get("password")?.value,
      passwordConfirm:this.resetPasswordForm.get("confirmPassword")?.value
    };
  }
  private validatePassword(): boolean {
    if(this.resetPasswordForm.get("password")?.value === this.resetPasswordForm.get("confirmPassword")?.value)return true;
    else return false;
  }
  
}

