import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from "rxjs";
import { AuthService } from '@app/modules/auth/services/auth.service';
import {DropdownModel, ToastService} from "ecapture-ng-ui";
import {Router, ActivatedRoute } from "@angular/router";
import { RecoveryPassword } from '@app/modules/auth/models/recoveryAccount';
@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

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
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_]+$')]],
      email:['', [Validators.required, Validators.email]]
    });
  }

  public recoveryPassword() : void {
    const params = this.buildParamsRecovery();
    console.log("Params to send", params);
    if (this.recoveryPasswordForm.valid) {
        this._subscriptions.add(
        this._authService.recoveryPassword(params).subscribe(
          (res) => {
            if (res.error) {
              this._messageService.add({type: 'error', message: res.msg, life: 5000});
            } else {
              this._messageService.add({type: 'error', message: 'Le hemos enviado un correo para que pueda confirmar su cuenta.', life: 5000});
              this._router.navigate(['/auth/reset-password'],{relativeTo:this._activatedRoute});
            }
          },
          () => {
            this._messageService.add({type: 'error', message: 'Conexión perdida con el Servidor!', life: 5000});
          })
        );
    } else {
      this._messageService.add({type: 'warning', message: 'Complete todos los campos correctamente!', life: 5000});
      this.recoveryPasswordForm.markAllAsTouched();
    }
  } 

  ngOnInit(): void {
  }
  public save():  void{
    console.log("SAVING");
  }
  private buildParamsRecovery() : RecoveryPassword {
    return {
      Nickname:this.recoveryPasswordForm.get("username")?.value,
      Email:this.recoveryPasswordForm.get("email")?.value
    };
  }
}
