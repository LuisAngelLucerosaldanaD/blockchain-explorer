import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from "rxjs";
import { AuthService } from '@app/modules/auth/services/auth.service';
import {DropdownModel, ToastService} from "ecapture-ng-ui";
import {onlyLetters, onlyNumbers} from "@app/helpers/helpers";
import {Router, ActivatedRoute } from "@angular/router";
import { DeleteAccount } from '@app/modules/auth/models/deleteAccount';
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  public recoveryPasswordForm : FormGroup;
  public usernameValidatorsValue = new Subject<string>();
  public emailValidatorsValue = new Subject<string>();
  public invalidName: boolean = false;
  public invalidEmail: boolean = false;
  private _subscriptions: Subscription = new Subscription();
  public pageRecovery: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private _messageService: ToastService,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute
  ) { 
    this.recoveryPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword:['', [Validators.required]],
      confirmDeleteAccount:['',[Validators.required]]
    });
    
  }
  public onlyNumber = (value: any) => onlyNumbers(value);

  public onlyLetters = (value: KeyboardEvent) => onlyLetters(value);
  public deleteAccount() : void {
    const params = this.buildParamsRecovery();
    console.log("Params to send", params);
    /* if (this.recoveryPasswordForm.valid) {
        this._subscriptions.add(
        this._authService.deleteAccount(params).subscribe(
          (res) => {
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
            } else {
              this._messageService.add({type: 'error', message: 'Le hemos enviado un correo para que pueda confirmar su cuenta.', life: 5000});
              this._router.navigate(['/explorer'],{relativeTo:this._activatedRoute});
            }
          },
          () => {
            this._messageService.add({type: 'error', message: 'Conexión perdida con el Servidor!', life: 5000});
          })
        );
    } else {
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000});
      this.recoveryPasswordForm.markAllAsTouched();
    } */
  } 

  ngOnInit(): void {
  }
  public save():  void{
    console.log("SAVING");
  }
  private buildParamsRecovery() : DeleteAccount {
    return {
      password:this.recoveryPasswordForm.get("password")?.value,
      confirmPassword:this.recoveryPasswordForm.get("confirmPassword")?.value
    };
  }
  private validatePassword(): boolean {
    if(this.recoveryPasswordForm.get("password")?.value === this.recoveryPasswordForm.get("confirmPassword")?.value) return true;
    else return true;
  }
}
